﻿using Mailjet.Client;
using Newtonsoft.Json.Linq;
using Mailjet.Client.Resources;
using RazorLight;

namespace API.Services
{
    public class EmailService
    {
        private readonly MailjetClient _client;
        private readonly string _clientHost;

        public EmailService(IConfiguration config)
        {
            _client = new MailjetClient(config["EmailProvider:PublicKey"], config["EmailProvider:PrivateKey"]);
            _clientHost = config["AppUrls:ClientHost"];
        }

        private async Task SendEmail(string subject, string toEmail, string htmlMessage)
        {
            MailjetRequest request = new MailjetRequest
            {
                Resource = Send.Resource,
            }
               .Property(Send.FromEmail, "re-store@veest.net")
               .Property(Send.FromName, "Re-Store")
               .Property(Send.Subject, subject)
               .Property(Send.HtmlPart, htmlMessage)
               .Property(Send.Recipients, new JArray {
                new JObject {
                    {"Email", toEmail}
                }});

            MailjetResponse response = await _client.PostAsync(request);

            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine(string.Format("Total: {0}, Count: {1}\n", response.GetTotal(), response.GetCount()));
                Console.WriteLine(response.GetData());
            }
            else
            {
                Console.WriteLine(string.Format("StatusCode: {0}\n", response.StatusCode));
                Console.WriteLine(string.Format("ErrorInfo: {0}\n", response.GetErrorInfo()));
                Console.WriteLine(string.Format("ErrorMessage: {0}\n", response.GetErrorMessage()));
            }
        }

        public async Task SendPasswordResetTokenEmail(Entities.User user, string token)
        {
            var model = new {Name = user.UserName, Url = $"{_clientHost}/reset/{token}?email={user.Email}"};

            string template = """
                <html>
                    <body>
                        <p>Hello @Model.Name,</p>
                        <p>Please click below to reset your password.</p>
                        <p>
                        <a href='@Model.Url'>Click here to reset</a>
                        </p>
                        <br/>
                        <br/>
                        <b>Re-Store</b>
                    </body>
                </html>
            """;

            RazorLightEngine engine = new RazorLightEngineBuilder()
                    .UseMemoryCachingProvider()
                    .Build();

            string html = await engine.CompileRenderStringAsync("ResetPassword", template, model);
            
            await SendEmail("Reset Your Password", user.Email, html);
        }
    }
}
