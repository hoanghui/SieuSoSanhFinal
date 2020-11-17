using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SieuSoSanhAPICore.Middlewares
{
    public class CheckAcessMiddleware
    {
        //Lưu middleware tiếp theo trong pipeline
        private readonly RequestDelegate _next;
        public CheckAcessMiddleware(RequestDelegate next) => _next = next; 
        public async Task Invoke(HttpContext httpContext)
        {
            if (httpContext.Request.Path == "/testxxx")
            {
                Console.WriteLine("CheckAcessMiddleware: Cấm truy cập");
                await Task.Run(
                    async () =>
                    {
                        string html = "<h1>CAM KHONG DUOC TRUY CAP</h1>";
                        httpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                        await httpContext.Response.WriteAsync(html);
                    }
                );
            }
            else
            {
                if (httpContext.Response.StatusCode == 404)
                {
                    await Task.Run(
                    async () =>
                    {
                        string html = "<h1>KHONG TIM THAY</h1>";
                        httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                        await httpContext.Response.WriteAsync(html);
                    }
                );
                }
                // Thiết lập Header cho HttpRespone
                httpContext.Response.Headers.Add ("throughCheckAcessMiddleware", new[] { DateTime.Now.ToString() });

                Console.WriteLine("CheckAcessMiddleware: Cho truy cập");

                //continue qua middleware tiếp theo
                await _next(httpContext);
            }
        }
    }
}
