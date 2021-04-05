using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crypto_tracker_BE
{
    public class MarketUtils
    {
        private static string baseCurrencySymbol = "BTC";
        private static string[] quoteCurrencySymbols = { "LTC", "XLM", "ETH", "NEO", "ADA" };

        public static List<string> MarketSymbols = (new List<string>(quoteCurrencySymbols))
                                                   .Select(s=> s+"-"+baseCurrencySymbol)
                                                   .ToList();
    }
}
