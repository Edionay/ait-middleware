#!/bin/bash

volume=""
if [ $MONITOR = true ]; then 
	volume="-v $MONITOR_DIR:/monitoring_output"
fi

#container_id=$(docker run --net overlay_net -d \
#$volume ait_cyclon_image:latest $@)
container_id=$(docker run --net overlay_net -d \
$volume ait-all-joint:latest $@)
container_ip=$(docker inspect -f "{{ .NetworkSettings.Networks.overlay_net.IPAddress }}" $container_id)

export container_ip

echo "Container $container_id started with IP $container_ip"
