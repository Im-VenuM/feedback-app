FROM jenkins/jenkins:lts

USER root
# Install Docker CLI & kubectl inside Jenkins
RUN apt-get update && apt-get install -y docker.io kubectl

# Allow Jenkins to access Docker socket
RUN usermod -aG docker jenkins

USER jenkins
