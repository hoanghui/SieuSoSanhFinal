using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SieuSoSanhAPICore.ViewModels
{
    public class SuppliersViewModel
    {
        public int SupplierID { get; set; }
        public string SupplierName { get; set; }
        public string CategoryCode { get; set; }
        public int QuantityProduct { get; set; }
    }
}
