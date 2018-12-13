set -o errexit

SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

docker build -t gcr.io/todoapp-221909/todoapp-app:v1 --build-arg service_version=v1 "${SCRIPTDIR}"