aws --version || RES=$?

echo "AWS-CLI version response = ${RES}"

if [ "${RES}" != "" ]
then
	echo "AWS-CLI does not installed."
	echo "Start installing AWS-CLI."
	sudo yum remove awscli
	curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
	unzip awscliv2.zip
	sudo ./aws/install
	aws --version || RES=$?
	echo "AWS-CLI re-verify version response = ${RES}"
else
	echo "AWS-CLI already installed."
fi
