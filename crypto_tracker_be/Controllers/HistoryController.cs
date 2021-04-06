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
        public async Task<IDictionary<string, IEnumerable<BittrexKline>>> Get([FromQuery] int hoursBack=6)
        { 
            using (var client = new BittrexClient())
            {
                // TODO validate hoursBack: min 2, max 744

                var historicalValues = new Dictionary<string, IEnumerable<BittrexKline>>();

                // Simple sequential version
                foreach (string symbol in MarketUtils.MarketSymbols)
                {
                    var candlestick = await client.GetKlinesAsync("ETH-BTC", KlineInterval.OneHour);
                    // filter specified interval
                    var filtered = candlestick.Data.Skip(Math.Max(0, candlestick.Data.Count() - hoursBack));
                    historicalValues.Add(symbol, filtered);
                }

                // TODO map market symbols to async tasks, await all, join result
                 
                return historicalValues; // plot just dates and closing values
            }
        }

    }
}
