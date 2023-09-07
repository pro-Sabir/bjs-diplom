
const logoutButton = new LogoutButton();

logoutButton.action = () => {

  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    } else {

      logoutButton.setMessage(response.error, false);
    }
  });
};



ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    } else {
      ProfileWidget.showProfileError(response.error);
    }
  });
  


const ratesBoard = new RatesBoard();

function updateCurrencyRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      console.error('Failed to fetch currency rates:', response.error);
    }
  });
}

setInterval(updateCurrencyRates, 60000);

updateCurrencyRates();

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Баланс успешно пополнен!');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};



moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Конвертация выполнена успешно!');
      } else {
        moneyManager.setMessage(response.success, response.error);
      }
    });
  };
  
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Перевод выполнен успешно!');
      } else {
        moneyManager.setMessage(response.success, response.error);
      }
    });
  };
  

ApiConnector.getFavorites((response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    } else {
      console.error('Failed to fetch favorites:', response.error);
    }
  });
  

favoritesWidget.addUserCallback = (data) => {

    ApiConnector.addUserToFavorites(data, (response) => {
      if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, 'Пользователь успешно добавлен в избранное!');
      } else {
        moneyManager.setMessage(response.success, response.error);
      }
    });
  };
  

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
      if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, 'Пользователь успешно удален из избранного!');
      } else {
        moneyManager.setMessage(response.success, response.error);
      }
    });
  };
  