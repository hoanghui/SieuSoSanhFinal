using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SieuSoSanhAPICore.Models;
using SieuSoSanhAPICore.ViewModels;

namespace SieuSoSanhAPICore.Controllers
{
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        [Route("api/suppliers/{categoryCode}")]
        [HttpGet]
        public IEnumerable<SuppliersViewModel> GetSuppliers(string categoryCode)
        {
            using (EntityDataContext _context = new EntityDataContext())
            {
                var category = _context.Categories.Where(n => n.CategoryCode == categoryCode).ToList();
                var categoryID = category[0].CategoryId;
                var products = _context.Products.Where(p => p.CategoryId == categoryID).ToList();
                var supplierIds = products.Select(n => n.SupplierId).Distinct().ToList();
                var suppliersTemp = _context.Suppliers.Where(m => supplierIds.Contains(m.SupplierId)).ToList();
                List<SuppliersViewModel> suppliers = new List<SuppliersViewModel>();
                foreach (var supplier in suppliersTemp)
                {
                    var totalProduct = _context.Products.Where(n => n.SupplierId == supplier.SupplierId).Count();
                    var temp = (from p in suppliersTemp
                                where p.SupplierId == supplier.SupplierId
                                select new SuppliersViewModel
                                {
                                    SupplierName = p.SupplierName,
                                    SupplierID = p.SupplierId,
                                    CategoryCode = categoryCode,
                                    QuantityProduct = totalProduct
                                }).ToList();
                    suppliers.AddRange(temp);
                }
                return suppliers;
            }
        }
    }
}
