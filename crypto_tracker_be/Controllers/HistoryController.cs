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
        public async Task<ObjectResult> Get([FromQuery] int hoursBack=6)
        { 
            using (var client = new BittrexClient())
            {
                if(hoursBack < 2 || hoursBack > 744)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "Hours must be between 2 and 744.");
                }

                var historicalValues = new Dictionary<string, IEnumerable<BittrexKline>>();

                try {
                    
                    foreach (string symbol in MarketUtils.MarketSymbols) // Simple sequential version
                    {
                        var candlestick = await client.GetKlinesAsync(symbol, KlineInterval.OneHour);
                       
                        var filtered = candlestick.Data
                                        .Skip(Math.Max(0, candlestick.Data.Count() - hoursBack));  // filter specified interval
                        
                        historicalValues.Add(symbol, filtered);
                    }

                    return Ok(historicalValues);
                } 
                catch (Exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
                }

            }
        }

    }
}
