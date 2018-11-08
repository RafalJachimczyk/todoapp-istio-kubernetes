set -o errexit

SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

docker build -t todoapp-api --build-arg service_version=v1 "${SCRIPTDIR}"
docker build -t todoapp-api --build-arg service_version=v2 "${SCRIPTDIR}"