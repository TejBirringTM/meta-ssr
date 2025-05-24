# Exit on error
set -e;

check_if_non_empty_string_or_exit() {
    # 1st arg - the name of the variable
    local name="$1";
    # 2nd arg - the value of the variable
    local value="$2";
    # 3rd arg (optional) - custom error message
    local error_message="${3:-"Error: $name not set!"}"

    if [[ -n "$value" ]]; then
        # value is non-empty string so echo out as return
        echo "$value";
    else
        # Print error to stderror:
        echo "$error_message" >&2;
        # Exit with error status:
        exit 1;        
    fi
}

check_file_or_exit() {
    # 1st arg - filename to check
    local filename="$1"
    # 2nd arg (optional) - custom error message
    local error_message="${2:-"Error: File '$filename' not found!"}"

    if [[ ! -f "$filename" ]]; then
        # Print error to stderror:
        echo "$error_message" >&2;
        # Exit with error status:
        exit 1;
    fi
}

check_if_non_empty_string_or_exit "Template filepath" "$1" "Error!\nTemplate filepath (argument no. 1) not specified." > /dev/null;

## LOAD ENV VARS FROM ENV FILE
source ../../load-env.sh --quiet;

# Check template file exists.
check_file_or_exit "$1" "Error!\nTemplate not found: $1";

# Load template and substitute variables with env vars.
envsubst < "$1";
