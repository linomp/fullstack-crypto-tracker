using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Bittrex.Net;
using Bittrex.Net.Objects;

namespace crypto_tracker_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicksController : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<BittrexTick>> Get()
        {
            using(var client = new BittrexClient())
            {
                var ticks = await client.GetTickersAsync();

                // TODO: handle errors
                IEnumerable<BittrexTick> query = ticks.Data.Where(tick => MarketUtils.MarketSymbols.Contains(tick.Symbol) );

                return query;
            }
        }

    }
}
