#!/bin/bash

AIT_CYCLON_PATH=""
if [ -z ${GOPATH+x} ]; then
	echo >&2 "Error: \$GOPATH variable is not set."
	echo >&2 "Please set it and add a symlink to code/ait_cyclon in your GOPATH/src/"
	exit 3
else
	echo "\$GOPATH exists at $GOPATH, cool."

	AIT_CYCLON_PATH="${GOPATH}/src/ait_cyclon"
	code_path=""
	if [ ! -d $AIT_CYCLON_PATH ]; then
		echo "The project path ($AIT_CYCLON_PATH) does not exist, we need to create it."

		while [[ ! -d $code_path ]]; do 
			current_path=$(pwd)
			read -p "Where is the code currently located (leave empty for: $current_path) ?" code_path

			if [[ $code_path == "" ]]; then
				code_path=$current_path
			fi
		done

		ln -s $code_path $AIT_CYCLON_PATH
		echo "Created a symlink from $code_path to $AIT_CYCLON_PATH"
	else 
		echo "Project path exists at $AIT_CYCLON_PATH, cool."
	fi
fi


if [ ! -d "${AIT_CYCLON_PATH}/vendor" ]; then
	command -v godep > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		echo >&2 "Error: We need godep to install Dolmen's dependencies, please go get it:"
		echo >&2 "\tgo get github.com/tools/godep"
		echo >&2 "(Also ensure $GOPATH/bin is in your\$PATH)"
		exit 4
	fi

	current_path=$(pwd)

	# godep will add external dependencies to vendor/ subdirectory in project path
	# which will make it possible to build project from docker without problems
	cd $AIT_CYCLON_PATH
	echo -n "Calling 'godep save' on $AIT_CYCLON_PATH to retrieve dependencies... "
	godep save
	echo "Done"

	cd $current_path
fi


echo "Building AIT Cyclon..."
mv start-processes.c ..
#docker run --rm -v "${AIT_CYCLON_PATH}:/go/src/ait_cyclon" -w /go/src/ait_cyclon \
#golang:alpine go build ait_cyclon
docker run --rm -v "${AIT_CYCLON_PATH}:/go/src/ait_cyclon" -w /go/src/ait_cyclon \
golang:wheezy go build ait_cyclon
mv ../start-processes.c .

if [ $? -ne 0 ]; then
	echo >&2 "Error building AIT Cyclon"
	exit 1
fi
#docker build -t ait_cyclon_image ${AIT_CYCLON_PATH}
docker build -t ait-all-joint ${AIT_CYCLON_PATH}
echo "Successfully built AIT Cyclon"

exit 0

