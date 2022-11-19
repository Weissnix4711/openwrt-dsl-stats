# OpenWrt DSL Statistics

Collect and graph DSL statistics using collectd and luci-statistics. Also provides statistics to Home Assistant via MQTT.

## Setup

- Create a new user `collector`.
  - Not actually necessary, can use `nobody` user as well, but edit [collectd-dsl.json](acl.d/collectd-dsl.json) accordinly.
- Copy [acl.d/collectd-dsl.json](acl.d/collectd-dsl.json) to `/usr/share/acl.d/`.
- Copy [bin/collect-dsl](bin/collect-dsl) to `/usr/bin/collect-dsl` and make it executable with `chmod +x /usr/bin/collect-dsl`.
- (Optional, for luci-statistics only) Copy [definitions/dsl.js](definitions/dsl.js) to `/www/luci-static/resources/statistics/rrdtool/definitions`.
- (Optional setup for MQTT) Add the contents of [collectd.conf](collectd.conf) to the end of `/etc/collectd.conf`. Note this will not survive restarts. I'm working on a better solution, but currently the MQTT plugin cannot be set up via uci / luci.

Please note for the ACL changes to be taken into effect, the device must be restarted. Also, the latest major release seems to have a bug where the HH5a can fail to boot after issuing the restart comand, and must be power cycled. Other targets should afaik be unaffected.

## Inspiration and other resources

[st31ny/openwrt_dsl_stats](https://github.com/st31ny/openwrt_dsl_stats)

- Now outdated, uses the old lua RRDtool definitions and does not handle the new JSON dslstat ouput.

[Lutzion/openwrt-dsl-statistics](https://github.com/Lutzion/openwrt-dsl-statistics)

- Uses an ugly cronjob to gather data with root user and store in temporary files. I've replaced this approach with a much more elegant ubus / ACL alternative.

[sqrwf/openwrt-collectd-exec-dslstats](https://github.com/sqrwf/openwrt-collectd-exec-dslstats)
