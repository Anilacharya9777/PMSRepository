using Microsoft.EntityFrameworkCore;
using PMS.Models;
using PMS.Repository;
using PMS.Services;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddDbContext<ProductManagementContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection")));

builder.Services.AddDbContext<ProductManagementContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("MyConnection")));

//builder.Services.AddControllersWithViews(); //27-11
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Add Swagger generator
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<BrandMasterService>();
builder.Services.AddScoped<ProductTypeMasterService>();
builder.Services.AddScoped<ProductMasterService>();
builder.Services.AddScoped<CategoryMasterService>();
builder.Services.AddScoped<ProductTransactionDetailsService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("https://localhost:44415") // Allow your React app's origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddSwaggerGen(options =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});
var app = builder.Build();


app.UseCors("AllowSpecificOrigins");
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    //app.UseHsts(); //27-11
    app.UseSwagger();
    app.UseSwaggerUI(); // Enable Swagger UI
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseStaticFiles();
app.UseRouting();

//27-11
//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller}/{action=Index}/{id?}");
app.MapControllers();

//app.MapFallbackToFile("index.html");//27-11

app.Run();
