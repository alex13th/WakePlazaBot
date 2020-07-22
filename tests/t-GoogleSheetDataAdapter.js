describe("class GoogleSheetDataAdapter", function() {
    let dataAdapter;
    describe("Создание объекта доступа к данным", function() {
        
      it("Создание экземпляра", function() {
        dataAdapter = new GoogleSheetDataAdapter(null, "wake", "wake");
  
        assert.equal(dataAdapter.spreadSheetId, null);
        assert.equal(dataAdapter.entrySheetName, "wake");
        assert.equal(dataAdapter.listSheetName, "wake");
      });
    });
  
    describe("Проверка методов доступа к данным", function() {
  
      describe("Получение списка активных резервирований", function() {
        let reserveRows;
  
        it("Получение строк", function() {
          reserveRows = dataAdapter.getActiveReserveRows();
        });
  
        it("Проверка количеств строк", function() {
          assert.equal(reserveRows.length, 12);
        });
  
        it("Проверка количеств столбцов", function() {
          assert.equal(reserveRows[0].length, 9);
        });
      });

      describe("Получение списка активных резервирований с обновлением", function() {
        let reserveRows, rowCount, sheet;

        before(function() {
          sheet = dataAdapter.openSheet("wake");
          rowCount = sheet.getDataRange().getValues().length - 1; // Минус заголовок
          dataAdapter.getActiveReserveRows().length; // Первичное получение строк
          sheet.appendRow([]); // Добавление строки в БД извне
        });
  
        it("Проверка количеств строк без Reload", function() {
          reserveRows = dataAdapter.getActiveReserveRows();
          assert.equal(reserveRows.length, rowCount);
        });
  
        it("Проверка количеств строк с Reload", function() {
          rowCount = sheet.getDataRange().getValues().length - 1;
          dataAdapter.needReload = true;
          reserveRows = dataAdapter.getActiveReserveRows();
          assert.equal(reserveRows.length, rowCount);
        });
      });
  

      describe("Проверка добавления строки", function() {
        let reserveRow, reserveRows, prevRowCount;
  
        before(function() {
          reserveRow = [new Date(),329454218,"Misha V",new Date("06.07.2020 10:00:00"),	new Date("06.07.2020 11:00:00"), "hour",1,1,1];
          prevRowCount = dataAdapter.getActiveReserveRows().length;
        });

        it("Добавление строки", function() {
          dataAdapter.appendReserveRow(reserveRow);
          reserveRows = dataAdapter.getActiveReserveRows();
        });
  
        it("Проверка количеств строк", function() {
          assert.equal(reserveRows.length, prevRowCount + 1);
        });
  
        it("Проверка последней строки", function() {
          let rowNum = reserveRows.length - 1;
          assert.deepEqual(reserveRows[rowNum][0], reserveRow[0]);
          assert.equal(reserveRows[rowNum][1], reserveRow[1]);
          assert.equal(reserveRows[rowNum][2], reserveRow[2]);
          assert.deepEqual(reserveRows[rowNum][3], reserveRow[3]);
          assert.deepEqual(reserveRows[rowNum][4], reserveRow[4]);
          assert.equal(reserveRows[rowNum][5], reserveRow[5]);
          assert.equal(reserveRows[rowNum][6], reserveRow[6]);
          assert.equal(reserveRows[rowNum][7], reserveRow[7]);
          assert.equal(reserveRows[rowNum][8], reserveRow[8]);
        });
      });
  
      describe("Проверка удаления строки", function() {
        let lastReserveRow, reserveRows, prevRowCount;
  
        before(function() {
          prevRowCount = dataAdapter.getActiveReserveRows().length;

          idColumnNumber = 0;
          idValue = new Date("07.02.2020 21:05:12");
          reserveRows = dataAdapter.getActiveReserveRows();
          lastReserveRow = reserveRows[reserveRows.length - 1];
        });

        it("Удаление строки", function() {
          dataAdapter.deleteReserveRow(idColumnNumber, idValue);
          reserveRows = dataAdapter.getActiveReserveRows();
        });
  
        it("Проверка количеств строк", function() {
          assert.equal(reserveRows.length, prevRowCount - 1);
        });
  
        it("Проверка последней строки", function() {
          let rowNum = reserveRows.length - 1;

          assert.deepEqual(reserveRows[rowNum][0], lastReserveRow[0]);
          assert.equal(reserveRows[rowNum][1], lastReserveRow[1]);
          assert.equal(reserveRows[rowNum][2], lastReserveRow[2]);
          assert.deepEqual(reserveRows[rowNum][3], lastReserveRow[3]);
          assert.deepEqual(reserveRows[rowNum][4], lastReserveRow[4]);
          assert.equal(reserveRows[rowNum][5], lastReserveRow[5]);
          assert.equal(reserveRows[rowNum][6], lastReserveRow[6]);
          assert.equal(reserveRows[rowNum][7], lastReserveRow[7]);
          assert.equal(reserveRows[rowNum][8], lastReserveRow[8]);
        });
      });
    });
  });
