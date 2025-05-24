# Exit on error
set -e;

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

# Deduce filepath of env file through directory of this script:
env_filepath="$(dirname "$(realpath "${BASH_SOURCE[0]}")")/.env";

# LOAD ENV VARS FROM ENV FILE:
# Mark variables which are modified or created for export.
set -a; 
# Check env file exists.
check_file_or_exit "$env_filepath" "Error!\nEnv file not found!";
# Execute commands from a file in the current shell:
# Load vars to env from env file.
source "$env_filepath";
# Unmark variables which are modified or created for export.
set +a;

# Parse args:
quiet_mode=0;
for arg in "${@:1}"; do
    if [[ "$arg" == "--quiet" ]]; then
        quiet_mode=1;
    fi
done

# Print output if not suppressed:
if [[ "$quiet_mode" != 1 ]]; then
    echo "*** Env vars loaded from env file. ***";
fi
