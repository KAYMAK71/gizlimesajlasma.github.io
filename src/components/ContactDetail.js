const handlePinSubmit = (e) => {
  e.preventDefault();
  // PIN'in 3 haneli olduğunu kontrol et
  if (pin.length === 3 && /^\d{3}$/.test(pin)) {
    setIsAuthenticated(true);
    setShowPinModal(false);
  } else {
    alert('Lütfen 3 haneli bir PIN giriniz');
  }
}; 