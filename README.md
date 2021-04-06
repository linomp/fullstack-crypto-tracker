# Cryptocurrency Tracker

## Development environment

### Backend built with:
- Visual Studio Community 2019 (Version 16.9.2)
- .NET version 5.0.100
- [Bittrex.Net v5.0.2 (wrapper for Bittrex API v3)](https://github.com/JKorf/Bittrex.Net)


## Extending the markets list

To extend it, open the file `MarketUtils.cs` and add desired symbols to the `quoteCurrencySymbols` array:
```csharp
public class MarketUtils
    {
        private static string baseCurrencySymbol = "BTC";
        private static string[] quoteCurrencySymbols = { "LTC", "XLM", "ETH", "NEO", "ADA" };
        
        ...
    }
```