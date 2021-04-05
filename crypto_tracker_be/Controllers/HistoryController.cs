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
        public async Task<IEnumerable<BittrexSymbolTrade>> Get()
        {
            using (var client = new BittrexClient())
            {
                // TODO change to historical values api call (candlestick?)
                var marketHistory = await client.GetSymbolTradesAsync("ETH-BTC");

                // TODO simple sequential version, append to result

                // TODO map markey symbols to async tasks, await all, join result

                return marketHistory.Data;
            }
        }

    }
}
