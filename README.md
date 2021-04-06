# Cryptocurrency Tracker

## Running the app
- With a command prompt, `cd` into the `crypto_tracker_fe` directory and run: 
    - `yarn install`

- Now you can open the Visual Studio project inside `crypto_tracker_be` and launch it with the IIS profile.
  - Note: the project is configured so that server gets started and a browser window with the client app is opened.

- If this fails, you can:
  - launch the Visual Studio project with the profile `crypto_tracker_BE`
  - `cd` into the `crypto_tracker_fe` directory and run: 
    - `yarn start`

## Development environment

### Backend built with:
- Visual Studio Community 2019 (Version 16.9.2)
- .NET version 5.0.100
- [Bittrex.Net v5.0.2 (wrapper for Bittrex API v3)](https://github.com/JKorf/Bittrex.Net)

### Frontend built with:
- Visual Studio Code v1.55.0
- React 17.0.2
- Redux 4.0.5

## Extending the markets list

In the file `crypto_tracker_be/MarketUtils.cs` you can add desired symbols to the `quoteCurrencySymbols` array:
```csharp
public class MarketUtils
    {
        private static string baseCurrencySymbol = "BTC";
        private static string[] quoteCurrencySymbols = { "LTC", "XLM", "ETH", "NEO", "ADA" };
        
        ...
    }
```

Thanks for your time :)