### deploy하기 위해 서버에 해야하는 작업
1. 업로드
    2. docker-install.sh / awscli-install.sh
    3. docker-deployment~.sh
    4. connect-docker~.sh
    5. remove-newline-char.sh
2. 환경변수 설정
    2. .bash_profile에 아래 환경변수 적용 (직접 pull 사용할때만 적용. github actions 이용한다면 필요없음.)
        - AWS_ACCESS_KEY_ID
        - AWS_SECRET_ACCESS_KEY
        - AWS_ECR_REGISTRY
        - USER_ID=$(id -u)
        - GROUP_ID=$(id -g)
    3. source .bash_profile
3. docker 권한 추가
    - sudo usermod -aG docker centos
    - sudo service docker restart
    - 사용자 로그아웃후 재접속


#### nginx deploy파일이 나뉘어져 있는것은 app에 연결된 nginx conf 파일이 상황에 따라 다르게 적용되어야 하기 때문임. 
#### nginx container 자체가 blue green으로 나뉘어져 있는게 아님.