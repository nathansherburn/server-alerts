# server-alerts
Send email alerts when a server is no longer reachable

## Setup
* `sudo apt-get install ssmtp mailutils`
* `sudo nano /etc/ssmtp/ssmtp.conf`
* Paste in contents of `example-ssmtp.conf` (ctrl + shift + v)
* Run script with `node alerts.js` (or `forever start alerts.js` - note: this requires forever to be installed)
