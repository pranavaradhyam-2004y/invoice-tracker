document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('invoiceDate').valueAsDate = new Date();
  calculateTotals();
  
  document.getElementById('tbody').addEventListener('input', calculateTotals);
});

function calculateTotals() {
  let subtotal = 0;
  const rows = document.querySelectorAll('#tbody tr');

  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('.qty').value) || 0;
    const price = parseFloat(row.querySelector('.price').value) || 0;
    const total = qty * price;
    
    row.querySelector('.item-total').textContent = `$${total.toFixed(2)}`;
    subtotal += total;
  });

  const tax = subtotal * 0.10;
  const grandTotal = subtotal + tax;

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('grandTotal').textContent = `$${grandTotal.toFixed(2)}`;
}

function addRow() {
  const tbody = document.getElementById('tbody');
  const tr = document.createElement('tr');
  
  tr.innerHTML = `
    <td><input type="text" class="desc" placeholder="Service description"></td>
    <td><input type="number" class="qty" value="1" min="1"></td>
    <td><input type="number" class="price" value="0" min="0"></td>
    <td class="item-total">$0.00</td>
    <td><button class="btn-danger" onclick="deleteRow(this)">X</button></td>
  `;
  
  tbody.appendChild(tr);
  calculateTotals();
}

function deleteRow(btn) {
  const row = btn.parentElement.parentElement;
  if (document.querySelectorAll('#tbody tr').length > 1) {
    row.remove();
    calculateTotals();
  }
}