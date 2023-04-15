'use strict';
'require baseclass';
'require form';

return baseclass.extend({
	title: _('MQTT Plugin Configuration'),
	description: _('Plugin to send and/or receive values with MQTT.'),

	addFormOptions: function(s) {
		var o, ss;

		o = s.option(form.Flag, 'enable', _('Enable this plugin'));
		o.default = '0';

		o = s.option(form.SectionValue, '__publish', form.TableSection, 'collectd_mqtt_publish');
		o.title = _('Publish');
		o.description = _('This section defines configuration for sending data to an MQTT broker.');
		o.depends('enable', '1');

		ss = o.subsection;
		ss.anonymous = true;
		ss.addremove = true;

		o = ss.option(form.Value, 'name', _('Name'));
		o.default = 'mqtt';
		o.datatype = 'string';

		o = ss.option(form.Value, 'host', _('Host'));
		o.default = 'localhost';
		o.datatype = 'host';

		o = ss.option(form.Value, 'port', _('Port'));
		o.default = '1883';
		o.datatype = 'port';
		o.optional = true;

		o = ss.option(form.Value, 'user', _('User'));
		o.default = '';
		o.datatype = 'string';
		o.optional = true;

		o = ss.option(form.Value, 'password', _('Password'));
		o.default = '';
		o.datatype = 'string';
		o.optional = true;

		o = ss.option(form.Value, 'clientid', _('Client ID'));
		o.default = 'openwrt';
		o.datatype = 'string';
		o.optional = true;

		o = ss.option(form.Value, 'qos', _('QoS'));
		o.default = '0';
		o.datatype = 'and(max(2),uinteger)';
		o.optional = true;

		o = ss.option(form.Value, 'prefix', _('Prefix'));
		o.default = 'collectd';
		o.datatype = 'string';
		o.optional = true;

		o = ss.option(form.Flag, 'retain', _('Retain'));
		o.default = '0';
		o.optional = true;

		o = s.option(form.SectionValue, '__subscribe', form.TableSection, 'colectd_mod_subscribe');
		o.title = _('Subscribe');
		o.description = _('This section defines configuration for receiving data via MQTT.');
		o.depends('enable', '1');

		ss = o.subsection;
		ss.anonymous = true;
		ss.addremove = true;

		o = ss.option(form.Value, 'name', _('Name'));
		o.default = 'mqtt';
		o.datatype = 'string';

		o = ss.option(form.Value, 'host', _('Host'));
		o.default = 'localhost';
		o.datatype = 'host';

		o = ss.option(form.Value, 'port', _('Port'));
		o.default = '1883';
		o.datatype = 'port';
		o.optional = true;

		o = ss.option(form.Value, 'user', _('User'));
		o.default = '';
		o.datatype = 'string';
		o.optional = true;

		o = ss.option(form.Value, 'password', _('Password'));
		o.default = '';
		o.datatype = 'string';
		o.optional = true;

		o = ss.option(form.Value, 'clientid', _('Client ID'));
		o.default = 'openwrt';
		o.datatype = 'string';
		o.optional = true;

		o = ss.option(form.Value, 'qos', _('QoS'));
		o.default = '2';
		o.datatype = 'and(max(2),uinteger)';
		o.optional = true;
	},

	configSummary: function(section) {
		return _('MQTT transmitting/receiving enabled.');
	}
});
