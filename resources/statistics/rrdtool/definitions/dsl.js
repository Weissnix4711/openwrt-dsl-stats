/*
 * Copyright (c) 2022 Thomas Aldrian
 * Licensed to the public under the Apache License 2.0.
 */

'use strict';
'require baseclass';

return baseclass.extend({
  title: _('DSL'),
  rrdargs: function(graph, host, plugin, plugin_instance, dtype) {
    var p = [];

    var uptime = {
      title: "%H: Uptime on %pi",
      vlabel: "Seconds",
      number_format: "%8.0lf s",
      autoscale_max: true,
      data: {
        types: ["uptime"],
        options: {
          uptime: {
            title: "Uptime",
          }
        }
      }
    };

    var bitrate = {
      title: "%H: Data rate on %pi",
      vlabel: "b/s",
      number_format: "%8.0lf b/s",
      autoscale_max: true,
      data: {
        types: ["bitrate"],
        instances: ["down", "up", "downadr", "upadr"],
        options: {
          bitrate_down: {
            title: "Data Rate Down",
            overlay: true,
            noarea: false,
            flip: true,
            weight: 1
          },
          bitrate_up: {
            title: "Data Rate Up",
            overlay: true,
            noarea: false,
            weight: 2
          },
          bitrate_downadr: {
            title: "ATTNDR Down",
            overlay: true,
            noarea: true,
            flip: true,
            weight: 3
          },
          bitrate_upadr: {
            title: "ATTNDR Up",
            overlay: true,
            noarea: true,
            weight: 4
          }
        }
      }
    };

    var snr = {
      title: "%H: Noise Margin on %pi",
      vlabel: "dB",
      number_format: "%5.1lf dB",
      autoscale_max: true,
      data: {
        types: ["snr"],
        instances: ["up", "down"],
        options: {
          snr_down: {
            title: "SNR Down",
            color: "00ff00",
            overlay: true,
            noarea: false,
            total: false,
            flip: true,
            weight: 1
          },
          snr_up: {
            title: "SNR Up",
            color: "0000ff",
            overlay: true,
            noarea: false,
            total: false,
            weight: 2
          }
        }
      }
    };

    var atn = {
      title: "%H: Attenuation on %pi",
      vlabel: "dB",
      number_format: "%5.1lf dB",
      autoscale_max: true,
      data: {
        types: ["atn"],
        instances: ["downlatn", "downsatn", "uplatn", "upsatn"],
        options: {
          atn_downlatn: {
            title: "LATN Down",
            color: "00ff00",
            overlay: true,
            noarea: false,
            total: false,
            flip: true,
            weight: 1
          },
          atn_downsatn: {
            title: "SATN Down",
            color: "0000ff",
            overlay: true,
            noarea: false,
            total: false,
            weight: 1
          },
          atn_uplatn: {
            title: "LATN Up",
            color: "00ff00",
            overlay: true,
            noarea: false,
            total: false,
            weight: 2
          },
          atn_upsatn: {
            title: "SATN Up",
            color: "0000ff",
            overlay: true,
            noarea: false,
            total: false,
            weight: 2
          }
        }
      }
    };

    var errors = {
      title: "%H: Errors on %pi",
      vlabel: "Errors",
      number_format: "%8.0lf",
      autoscale_max: true,
      data: {
        types: ["errors"],
        instances: ["es", "ses", "loss", "uas", "f_es", "f_ses", "f_loss", "f_uas"],
        options: {
          errors_es: {
            title: "ES",
            color: "00ff00",
            overlay: true,
            noarea: true,
            total: false,
            weight: 1
          },
          errors_ses: {
            title: "SES",
            color: "00ff00",
            overlay: true,
            noarea: true,
            total: false,
            weight: 1
          },
          errors_loss: {
            title: "LOSS",
            color: "00ff00",
            overlay: true,
            noarea: true,
            total: false,
            weight: 1
          },
          errors_uas: {
            title: "UAS",
            color: "0000ff",
            overlay: true,
            noarea: true,
            total: false,
            weight: 1
          },
          errors_f_es: {
            title: "Far ES",
            color: "00ff00",
            overlay: true,
            noarea: true,
            total: false,
            flip: true,
            weight: 2
          },
          errors_f_ses: {
            title: "Far SES",
            color: "00ff00",
            overlay: true,
            noarea: true,
            total: false,
            flip: true,
            weight: 2
          },
          errors_f_loss: {
            title: "Far LOSS",
            color: "ff8000",
            overlay: true,
            noarea: true,
            total: false,
            flip: true,
            weight: 2
          },
          errors_f_uas: {
            title: "Far UAS",
            color: "ff00ff",
            overlay: true,
            noarea: true,
            total: false,
            flip: true,
            weight: 2
          }
        }
      }
    };

    var crc = {
      title: "%H: CRC Errors on %pi",
      vlabel: "CRC Errors",
      number_format: "%8.0lf",
      autoscale_max: true,
      data: {
        types: ["crc"],
        instances: ["crc", "crcp", "f_crc", "f_crcp"],
        options: {
          crc_crc: {
            title: "CRC Errors",
            color: "00ff00",
            overlay: true,
            noarea: true,
            total: false
          },
          crc_crcp: {
            title: "Pre-emptive CRC Errors",
            color: "0000ff",
            overlay: true,
            noarea: true,
            total: false
          },
          crc_f_crc: {
            title: "Far CRC Errors",
            color: "ff80000",
            overlay: true,
            noarea: true,
            total: false,
            flip: true
          },
          crc_f_crcp: {
            title: "Far Pre-emptive CRC Errors",
            color: "ff00ff",
            overlay: true,
            noarea: true,
            total: false,
            flip: true
          }
        }
      }
    };

    var types = graph.dataTypes(host, plugin, plugin_instance);

    for (var i = 0; i < types.length; i++) {
      switch(types[i]) {
        case 'uptime':
          p.push(uptime);
          break;
        case 'bitrate':
          p.push(bitrate);
          break;
        case 'snr':
          p.push(snr);
          break;
        case 'atn':
          p.push(atn);
          break;
        case 'errors':
          p.push(errors);
          break;
        case 'crc':
          p.push(crc);
          break;
      }
    }

    return p;
  }
});
