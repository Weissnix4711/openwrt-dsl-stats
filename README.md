# OpenWrt DSL Statistics

Collect and graph DSL statistics using collectd and luci-statistics. Also provides statistics to Home Assistant via MQTT.

## Setup

- Create a new user `collector`.
  - Not actually necessary, can use `nobody` user as well, but edit [collector.json](usr/share/acl.d/collector.json) accordinly.
- Copy [collector.json](usr/share/acl.d/collector.json) to `/usr/share/acl.d/`.
- Copy [collect-dsl](usr/bin/collect-dsl) to `/usr/bin/collect-dsl` and make it executable with `chmod +x /usr/bin/collect-dsl`.
- (Optional, for luci-statistics only) Copy [dsl.js](resources/statistics/rrdtool/definitions/dsl.js) to `/www/luci-static/resources/statistics/rrdtool/definitions`.

## (Optional) MQTT Collectd Plugin setup via LuCI

- Copy [mqtt.js](resources/view/statistics/plugins/mqtt.js) to `/www/luci-static/resources/view/statistics/plugins/mqtt.js` then copy [mqtt.json](usr/share/luci/statistics/plugins/mqtt.json) to `/usr/share/luci/statistics/plugins/mqtt.json`.
- Update package lists: `opkg update`
- Install the patch package: `opkg install patch`

Then run the following command:

```
wget -O /tmp/stat-genconfig.patch https://raw.githubusercontent.
com/Weissnix4711/openwrt-dsl-stats/master/stat-genconfig.lua.patch && patch /tmp/stat-genconfig.patch /usr/bin/stat-genconfig
```

This will patch stat-genconfig so it understands how to process the extra configuration for the MQTT plugin.

---

Please note for the ACL changes to be taken into effect, the device must be restarted. Also, OpenWrt versions 22.03.0 -> 22.03.3 can cause the HH5a to get stuck in a boot loop. Other targets should afaik be unaffected.

## Inspiration and other resources

[st31ny/openwrt_dsl_stats](https://github.com/st31ny/openwrt_dsl_stats)

- Now outdated, uses the old lua RRDtool definitions and does not handle the new JSON dslstat ouput.

[Lutzion/openwrt-dsl-statistics](https://github.com/Lutzion/openwrt-dsl-statistics)

- Uses an ugly cronjob to gather data with root user and store in temporary files. I've replaced this approach with a much more elegant ubus / ACL alternative.

[sqrwf/openwrt-collectd-exec-dslstats](https://github.com/sqrwf/openwrt-collectd-exec-dslstats)
