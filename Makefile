include .env
export

synth:
	sh stack.sh "synth"

deploy:
	sh stack.sh "deploy"
