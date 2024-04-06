sudo docker pull ${AWS_ECR_REGISTRY}/maple-app:latest
IS_GREEN=$(sudo docker ps | grep green)
IMG_GREEN=maple-app-green
IMG_BLUE=maple-app-blue
if [ -z $IS_GREEN ];then # when blue
        echo "### BLUE => GREEN ###"
        sudo docker tag ${AWS_ECR_REGISTRY}/maple-app:latest ${IMG_GREEN}:latest

        if [ -d ${HOME}/volume/green/front-build ]; then
                rm -r ${HOME}/volume/green/front-build/*
                echo "1. clear green build file"
        fi

        sudo docker run -itd -p 8080:8080 -v ${HOME}/volume/green:/home/maple/volume --network network-maple --ip 172.21.0.50 --entrypoint sh --name ${IMG_GREEN} ${IMG_GREEN}:latest start-app.sh

        while [ 1 = 1 ];do
                echo "2. green health check "
                sleep 3
		#curl -sSf http://localhost:8080/healthcheck || RES=$?
		RES=$(curl -sSf http://localhost:8080/healthcheck)

                if [ $RES == "success" ];then
                        echo "health check success"
			break
                fi
        done
else
        echo "### GREEN => BLUE ###"
        sudo docker tag ${AWS_ECR_REGISTRY}/maple-app:latest ${IMG_BLUE}:latest

        if [ -d ${HOME}/volume/blue/front-build ]; then
                rm -r ${HOME}/volume/blue/front-build/*
                echo "1. clear blue build file"
        fi

        sudo docker run -itd -p 8081:8080 -v ${HOME}/volume/blue:/home/maple/volume --network network-maple --ip 172.21.0.51 --entrypoint sh --name ${IMG_BLUE} ${IMG_BLUE}:latest start-app.sh

        while [ 1 = 1 ];do
                echo "2. blue health check "
                sleep 3
                #curl -sSf http://localhost:8081/healthcheck || RES=$?
		RES=$(curl -sSf http://localhost:8081/healthcheck)

                if [ $RES == "success" ];then
                        echo "health check success"
			break
                fi
        done
fi
