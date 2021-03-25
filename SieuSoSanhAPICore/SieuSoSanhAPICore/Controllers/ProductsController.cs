using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SieuSoSanhAPICore.Models;
using SieuSoSanhAPICore.ViewModels;

namespace SieuSoSanhAPICore.Controllers
{
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [Route("api/products")]
        [HttpGet]
        public async Task<IEnumerable<ProductsViewModel>> Get()
        {
            using (EntityDataContext _context = new EntityDataContext())
            {
                return await _context.Products.Select(p=>new ProductsViewModel()
                {
                    ProductID = p.ProductId,
                    ProductName = p.ProductName,
                    HyperLink = p.HyperLink,
                    Price = p.Price,
                    LinkOfProductImage = p.LinkOfProductImage
                }).ToListAsync();
            }
        }

        // SETTING ROUTEv
        //Search by product name
        [Route("api/products/search/{productName}")]
        [HttpGet]
        public IEnumerable<ProductsViewModel> Search(string productName)
        {
            using (EntityDataContext _context = new EntityDataContext())
            {
                var data = _context.Products.Where(p => p.ProductName.Contains(productName)).AsNoTracking().ToList();
                return data.Select(p => new ProductsViewModel()
                {
                    ProductID = p.ProductId,
                    ProductName = p.ProductName,
                    HyperLink = p.HyperLink,
                    Price = p.Price,
                    LinkOfProductImage = p.LinkOfProductImage,
                    CategoryID = p.CategoryId,
                    SupplierID = p.SupplierId,
                    CompanyID = p.CompanyId
                }).ToList();
                }
            
        }  

        [Route("api/products/{categoryCode}")]
        [HttpGet]
        public IEnumerable<ProductsViewModel> GetProductByCategory(string categoryCode)
        {
            using (EntityDataContext _context = new EntityDataContext())
            {
                var list = (from p in _context.Products
                            join c in _context.Categories on p.CategoryId equals c.CategoryId
                            where c.CategoryCode == categoryCode
                            select new ProductsViewModel
                            {
                                ProductID = p.ProductId,
                                ProductName = p.ProductName,
                                HyperLink = p.HyperLink,
                                Price = p.Price,
                                LinkOfProductImage = p.LinkOfProductImage,
                                CategoryName = c.CategoryName,
                                CategoryCode = c.CategoryCode
                            }).ToList();
                return list;
            }
        }

        [Route("api/products/detail/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetProductByID(int id)
        {
            EntityDataContext _context = new EntityDataContext();
            var product = _context.Products.Where(p => p.ProductId == id).ToList();
            if (product.Count == 0)
            {
                return NotFound();
            }
            else
            {
                var companyID = product[0].CompanyId;
                var company = _context.Companies.Where(c => c.CompanyId == companyID).ToList();
                var logo = company[0].CompanyImage;
                var list = _context.Products.AsNoTracking().Join(_context.Suppliers, p => p.SupplierId, s => s.SupplierId, (p, s) => new ProductsViewModel()
                {
                    ProductID = p.ProductId,
                    ProductName = p.ProductName,
                    HyperLink = p.HyperLink,
                    Price = p.Price,
                    LinkOfProductImage = p.LinkOfProductImage,
                    CategoryID = p.CategoryId,
                    SupplierID = p.SupplierId,
                    CompanyID = p.CompanyId,
                    SupplierName = s.SupplierName,
                    CompanyImage = logo
                }).Where(p => p.ProductID == id).ToList();
                return new ObjectResult(list);
            }
        }

        [Route("api/products/SameProducts/{ProductID}")]
        [HttpGet]
        public IEnumerable<ProductsViewModel> GetSameProduct(int productID)
        {
            using (EntityDataContext _context = new EntityDataContext())
            {
                var product = (_context.Products.Where(p => p.ProductId == productID).Select(p => new ProductsViewModel()
                {
                    ProductID = p.ProductId,
                    ProductName = p.ProductName,
                    HyperLink = p.HyperLink,
                    Price = p.Price,
                    LinkOfProductImage = p.LinkOfProductImage,
                    CategoryID = p.CategoryId,
                    SupplierID = p.SupplierId,
                    CompanyID = p.CompanyId
                })).ToList();

                string productName = product[0].ProductName;
                string[] words = productName.Split(' ');

                List<ProductsViewModel> productList = new List<ProductsViewModel>();
                for (int i = 0; i < words.Length; i++)
                {
                    var temp = words[i];
                    if (i == 0)
                    {
                        var products = _context.Products.Join(_context.Companies, p => p.CompanyId, c => c.CompanyId, (p, c) => new ProductsViewModel()
                        {
                            ProductID = p.ProductId,
                            ProductName = p.ProductName,
                            HyperLink = p.HyperLink,
                            Price = p.Price,
                            LinkOfProductImage = p.LinkOfProductImage,
                            CategoryID = p.CategoryId,
                            SupplierID = p.SupplierId,
                            CompanyID = p.CompanyId,
                            CompanyImage = c.CompanyImage
                        }).Where(p => p.ProductName.Contains(temp)).ToList();

                        productList.AddRange(products);
                    }
                    else
                    {
                        for (int j = 0; j < productList.Count; j++)
                        {
                            if (productList[j].ProductName.Contains(temp) == false || productList[j].ProductID == productID)
                            {
                                productList.RemoveAt(j);
                                j = -1;
                            }
                        }
                    }
                }
                return productList;
            }
        }

        [Route("api/products/{categoryCode}/{supplierCode}")]
        [HttpGet]
        public IEnumerable<ProductsViewModel> GetCategoryWithBrand(string categoryCode, string supplierCode)
        {
            if (categoryCode == null || supplierCode == null)
            {
                List<ProductsViewModel> list = null;
                return list;
            }
            using (EntityDataContext _context = new EntityDataContext())
            {
                var sup = _context.Suppliers.Where(p => p.SupplierName.ToLower() == supplierCode).ToList();
                var supItem = sup[0];

                var list = (from p in _context.Products
                            join c in _context.Categories on p.CategoryId equals c.CategoryId
                            where c.CategoryCode == categoryCode && p.SupplierId == supItem.SupplierId
                            select new ProductsViewModel
                            {
                                ProductID = p.ProductId,
                                ProductName = p.ProductName,
                                HyperLink = p.HyperLink,
                                Price = p.Price,
                                LinkOfProductImage = p.LinkOfProductImage,
                                CategoryName = c.CategoryName,
                                CategoryID = p.CategoryId,
                                CompanyID = p.CompanyId,
                                SupplierID = p.SupplierId,
                                CategoryCode = categoryCode
                            }).ToList();
                return list;
            }
        }

        //pagination test
        [Route("api/products/{categoryCode}/page={num}")]
        [HttpGet]   
        public IEnumerable<ProductsViewModel> TestPagination(string categoryCode, int num)
        {
            using (EntityDataContext _context = new EntityDataContext())
            {
                var startIndex = (num - 1) * 24;  
                var list = (from p in _context.Products
                            join c in _context.Categories on p.CategoryId equals c.CategoryId
                            where c.CategoryCode == categoryCode
                            select new ProductsViewModel
                            {
                                ProductID = p.ProductId,
                                ProductName = p.ProductName,
                                HyperLink = p.HyperLink,
                                Price = p.Price,
                                LinkOfProductImage = p.LinkOfProductImage,
                                CategoryName = c.CategoryName,
                                CategoryCode = c.CategoryCode
                            }).Skip(startIndex).Take(24).ToList(); 
                return list;
            }
        }   

        [Route("api/products/filter/{min}/{max}")]
        [HttpGet]
        public IEnumerable<Product> FilterPrice(int? min, int? max) 
        {
            EntityDataContext _context = new EntityDataContext();
            var products = _context.Products.Where(p => p.Price >= min && p.Price <= max).ToList();
            return products;
        }
    }
}
