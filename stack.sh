# exit when any command fails
set -e

if [ "$STACK_ENV" = "local" ]
then
    alias cdk="cdklocal"
fi

case "$1" in

    synth)
        cdk synth
        ;;

    deploy)
        cdk bootstrap
        cdk deploy
        ;;

    *)
        echo "unknown stack option"
        exit 1
        ;;

esac
