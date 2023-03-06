#!/usr/bin/env bash
#
# Entry script to execute nuxt on node-server
#
# Usage:
#  entry.sh [/path/to/.env]
#
set -eu

here="$(cd -P "$(dirname "${BASH_SOURCE:-0}")" && pwd -P)"

declare -A options
options=(
    [env]=""
    [sslcert]=""
    [sslkey]=""
)

# If shdotenv not found, download it at first
if [ ! -e "$here/shdotenv" ]; then
    echo "shdotenv not found, download..."
    curl -L https://github.com/ko1nksm/shdotenv/releases/latest/download/shdotenv >"$here"/shdotenv
fi
chmod +x "$here"/shdotenv

export PROJECT_HOME="$(cd -P "$here/../" && pwd)"
export OUTPUT_DIR=${OUTPUT_DIR:-"${PROJECT_HOME}/.output"}
DOTENV="$PROJECT_HOME/.env"

abort() {
    error "$@"
    exit 1
} >&2

usage() {
    cat <<EOS
usage: $(basename $0) [<options>] [<args>]

  Start node server in production mode.

Options:
  -e, --env FILE    Location of the .env file [default: PROJECT_HOME/.env]
  --sslcert FILE    Location of the ssl certification file
  --sslkey FILE     Location of the ssl key file
  -h, --help        Show usage

EOS
}

parse_options() {
    local status=0
    while [ $# -gt 0 ]; do
        case "$1" in
        -e | --env)
            shift
            options[env]="$1"
            ;;
        --sslcert)
            shift
            options[sslcert]="$1"
            ;;
        --sslkey)
            shift
            options[sslkey]="$1"
            ;;
        -h | --help)
            usage && exit
            ;;
        -*)
            abort "error: $(self): invalid option: $1"
            ;;
        *)
            exec_command="$*"
            break
            ;;
        esac
        shift
    done

    if [ -n "${options[env]}" ]; then
        abort "env file not found"
    fi
    if [ -n "${options[sslcert]}" ]; then
        abort "ssl cert file not found"
    fi
    if [ -n "${options[sslkey]}" ]; then
        abort "ssl key file not found"
    fi
}

parse_options "$@"

# Load .env
eval "$("$here"/shdotenv --env "$DOTENV")"

if [ -n "${options[sslcert]}" -a -n "${options[sslkey]}" ]; then
    NITRO_SSL_CERT="$(cat "${options[sslcert]}")"
    NITRO_SSL_KEY="$(cat "${options[sslkey]}")"
    export NITRO_SSL_CERT NITRO_SSL_KEY
fi

# Run node server
exec node "$OUTPUT_DIR"/server/index.mjs
