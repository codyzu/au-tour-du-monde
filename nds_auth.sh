#!/bin/sh

# We store the secret in a separate file
AUTH_SECRET="$(cat /etc/wifi-auth-secret)"
METHOD="$1"
MAC="$2"

case "$METHOD" in
  auth_client)
    USERNAME="$3"

    curl \
      --data "{\"method\": \"$METHOD\", \"mac\": \"$MAC\", \"email\":\"$USERNAME\"}" \
      --header "Content-Type: application/json" \
      --header "x-auth-secret: $AUTH_SECRET" \
      --request POST \
      --write-out "%{http_code}" \
      --silent \
      --show-error \
      https://us-central1-au-tour-du-monde.cloudfunctions.net/wifi 2>&1 | logger

      # Always echo success and 2 hours of access
      echo 7200 0 0
      exit 0
    ;;
  *)
    INGOING_BYTES="$3"
    OUTGOING_BYTES="$4"
    SESSION_START="$5"
    SESSION_END="$6"
    # client_auth: Client authenticated via this script.
    # client_deauth: Client deauthenticated by the client via splash page.
    # idle_deauth: Client was deauthenticated because of inactivity.
    # timeout_deauth: Client was deauthenticated because the session timed out.
    # ndsctl_auth: Client was authenticated by the ndsctl tool.
    # ndsctl_deauth: Client was deauthenticated by the ndsctl tool.
    # shutdown_deauth: Client was deauthenticated by Nodogsplash terminating.

    curl \
      --data "{\"method\": \"$METHOD\", \"mac\": \"$MAC\", \"ingoingBytes\": \"$INGOING_BYTES\", \"outgoingBytes\": \"$OUTGOING_BYTES\", \"sessionStart\": \"$SESSION_START\", \"sessionEnd\": \"$SESSION_END\"}" \
      --header "Content-Type: application/json" \
      --header "x-auth-secret: $AUTH_SECRET" \
      --request POST \
      --write-out "%{http_code}" \
      --silent \
      --show-error \
      https://us-central1-au-tour-du-monde.cloudfunctions.net/wifi 2>&1 | logger
    ;;
esac
