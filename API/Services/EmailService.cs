using Mailjet.Client;
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
            string templatesPath = new FileInfo("Services/EmailTemplates/").Directory.FullName;

            var engine = new RazorLightEngineBuilder()
                    .UseFileSystemProject(templatesPath)
                    .UseMemoryCachingProvider()
                    .Build();

            var model = new {Name = user.UserName, Url = $"{_clientHost}/reset/{token}?email={user.Email}"};
            string result = await engine.CompileRenderAsync("ResetPassword.cshtml", model);

            await SendEmail("Reset Your Password", user.Email, result);
        }
    }
}
