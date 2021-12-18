'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')
const si = require('systeminformation');

class SystemServerService extends Service {

  /**
   * 查询
   * @return {Promise<{disk: {}, memory: {total: number, available: number}, runtime: {npmVersion: string, os: string, nodeVersion: string, arch: string}, cpu: {coresLoad: {rawLoadIdle: *, rawLoad: *}[], rawCurrentLoadIdle: number, model: string, physicalCores: number, brand: string, speed: number, rawCurrentLoad: number, manufacturer: string}}>}
   */
  async get() {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const versions = await si.versions('node, npm');
    const osinfo = await si.osInfo();
    const cpuinfo = await si.cpu();
    const currentLoadinfo = await si.currentLoad();

    // 计算总空间
    const diskListInfo = await si.fsSize();
    const diskinfo = {};
    diskinfo.size = diskListInfo[0].size;
    diskinfo.available = diskListInfo[0].available;
    diskinfo.used = 0;
    diskListInfo.forEach(d => {
      diskinfo.used += d.used;
    });

    const meminfo = await si.mem();

    const res = {
      runtime: {
        npmVersion: versions.npm,
        nodeVersion: versions.node,
        os: osinfo.platform,
        arch: osinfo.arch,
      },
      cpu: {
        manufacturer: cpuinfo.manufacturer,
        brand: cpuinfo.brand,
        physicalCores: cpuinfo.physicalCores,
        model: cpuinfo.model,
        speed: cpuinfo.speed,
        rawCurrentLoad: currentLoadinfo.rawCurrentLoad,
        rawCurrentLoadIdle: currentLoadinfo.rawCurrentLoadIdle,
        coresLoad: currentLoadinfo.cpus.map(e => {
          return {
            rawLoad: e.rawLoad,
            rawLoadIdle: e.rawLoadIdle,
          };
        }),
      },
      disk: diskinfo,
      memory: {
        total: meminfo.total,
        available: meminfo.available,
      },
    };

    return res
  }

}

module.exports = SystemServerService;
