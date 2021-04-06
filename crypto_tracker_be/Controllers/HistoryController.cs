using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Bittrex.Net;
using Bittrex.Net.Objects;
using CryptoExchange.Net.Objects;

namespace crypto_tracker_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<BittrexKline>> Get([FromQuery] int hoursBack=6)
        { 
            using (var client = new BittrexClient())
            {
                // TODO validate hoursBack: min 2, max 744

                // TODO change to historical values api call (candlestick?)
                var candlestick =  await client.GetKlinesAsync("ETH-BTC", KlineInterval.OneHour);

                // TODO simple sequential version, append to result

                // TODO map markey symbols to async tasks, await all, join result

                // TODO filter specified interval and return just closing values
                var limited = candlestick.Data.Skip(Math.Max(0, candlestick.Data.Count() - hoursBack));

                // TODO return just dates and closing values?

                return limited; 
            }
        }

    }
}
