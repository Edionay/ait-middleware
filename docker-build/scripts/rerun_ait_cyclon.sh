#!/bin/bash

N_CONTAINERS=2
EXPERIMENT_TIME=70
MONITOR=true
STOP_NOT_RM=1 # Stop containers instead of rm'ing them (to access docker logs)
CYCLON_PERIOD_MS=300

PROJECT_DIR=$(pwd)
MONITOR_DIR=$PROJECT_DIR/monitoring_output
ARGS="-net=13.37.0.0/16 -m=/monitoring_output -cy_period=$CYCLON_PERIOD_MS "
if [ $MONITOR = true ]; then 
	ARGS=$ARGS"-mcy "
fi
ARGS=$ARGS"-bs_addr="
GOSSIP_PORT=10337

if [ -d $MONITOR_DIR ]; then 
	rm -f $MONITOR_DIR/*
else 
	if [ $MONITOR = true ]; then 
		mkdir $MONITOR_DIR
	fi
fi
echo -n "Removing previous instances... "
#docker rm -f $(docker ps -aq -f "ancestor=ait_cyclon_image") > /dev/null 2>&1
docker rm -f $(docker ps -aq -f "ancestor=ait-all-joint") > /dev/null 2>&1
echo "Done."

$PROJECT_DIR/scripts/build_ait_cyclon.sh
if [ $? -ne 0 ]; then
	exit 1
fi

docker network create --subnet=13.37.0.0/20 overlay_net > /dev/null 2>&1 

curl -X PUT -d '2' 'https://fiery-inferno-5459.firebaseio.com/aitmiddleware/browser-extension/ids.json'

for i in `seq 1 $N_CONTAINERS`; do
	echo "Starting container #$i"
	# Sourcing notation (". <script>") to get $container_ip to this file
	. $PROJECT_DIR/scripts/run_ait_cyclon.sh $ARGS

	if [ $i -eq 1 ]; then
		ARGS="$ARGS$container_ip:$GOSSIP_PORT"
	fi

    sleep 2
done


echo "Instances are running, we wait $EXPERIMENT_TIME seconds"
sleep $EXPERIMENT_TIME


if [ $STOP_NOT_RM -eq 0 ]; then
	echo "Deleting instances"
	#docker rm -f $(docker ps -aq -f "ancestor=ait_cyclon_image") > /dev/null 2>&1
    docker rm -f $(docker ps -aq -f "ancestor=ait-all-joint") > /dev/null 2>&1
else
	echo "Stopping instances"
	#docker stop $(docker ps -aq -f "ancestor=ait_cyclon_image") > /dev/null 2>&1
    docker stop $(docker ps -aq -f "ancestor=ait-all-joint") > /dev/null 2>&1 
fi
