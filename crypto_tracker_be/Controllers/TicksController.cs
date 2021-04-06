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
        public async Task<ObjectResult> Get()
        {
            using(var client = new BittrexClient())
            {
                try
                {
                    var ticks = await client.GetTickersAsync();

                    IEnumerable<BittrexTick> query = ticks.Data.Where(tick => MarketUtils.MarketSymbols.Contains(tick.Symbol) );

                    return Ok(query);
                }
                catch(Exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
                }

            }
        }

    }
}
