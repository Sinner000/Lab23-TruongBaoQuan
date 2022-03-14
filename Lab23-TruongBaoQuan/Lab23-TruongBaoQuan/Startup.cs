using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Lab23_TruongBaoQuan.Startup))]
namespace Lab23_TruongBaoQuan
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
