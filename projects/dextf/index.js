/*==================================================
  Modules
  ==================================================*/

  const TVLV1 = require('./v1');
  const TVLV2 = require('./v2');

  const BigNumber = require('bignumber.js');

/*==================================================
  TVL
  ==================================================*/

  async function tvl(timestamp, block) {
    const [v1, v2] = await Promise.all([TVLV1(timestamp, block), TVLV2(timestamp, block)]);

    const tokenAddresses = new Set(Object.keys(v1).concat(Object.keys(v2)));

    const balances = (
      Array
        .from(tokenAddresses)
        .reduce((accumulator, tokenAddress) => {
          const v1Balance = new BigNumber(v1[tokenAddress] || '0');
          const v2Balance = new BigNumber(v2[tokenAddress] || '0');
          accumulator[tokenAddress] = v1Balance.plus(v2Balance).toFixed();

          return accumulator
        }, {})
    );

    return balances;
  }

/*==================================================
  Exports
  ==================================================*/

  module.exports = {
    name: 'dextf',
    website: "https://dextf.com",
    token: "DEXTF",
    category: 'assets',
    start: 1595853825,  // 27/07/2020 @ 12:43:45am (UTC)
    tvl
  }
