describe("class GoogleSheetDataAdapter", function() {
    let dataAdapter;
    describe("Создание объекта доступа к данным", function() {
        
      it("Создание экземпляра", function() {
        dataAdapter = new GoogleSheetDataAdapter(WAKE_SPREAD_SHEET, ENTRY_SHEET_NAME, LIST_SHEET_NAME);
  
        assert.equal(dataAdapter.spreadSheetId, WAKE_SPREAD_SHEET);
        assert.equal(dataAdapter.entrySheetName, ENTRY_SHEET_NAME);
        assert.equal(dataAdapter.listSheetName, LIST_SHEET_NAME);
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
  
      describe("Проверка добавления строки", function() {
        let reserveRow;
        let reserveRows;
  
        it("Добавление строки", function() {
          reserveRow = [new Date(),329454218,"Misha V",new Date("06.07.2020 10:00:00"),	new Date("06.07.2020 11:00:00"), "hour",1,1,1];
          dataAdapter.appendReserveRow(reserveRow);
          reserveRows = dataAdapter.getActiveReserveRows();
        });
  
        it("Проверка количеств строк", function() {
          assert.equal(reserveRows.length, 13);
        });
  
        it("Проверка последней строки", function() {
          assert.deepEqual(reserveRows[12][0], reserveRow[0]);
          assert.equal(reserveRows[12][1], reserveRow[1]);
          assert.equal(reserveRows[12][2], reserveRow[2]);
          assert.deepEqual(reserveRows[12][3], reserveRow[3]);
          assert.deepEqual(reserveRows[12][4], reserveRow[4]);
          assert.equal(reserveRows[12][5], reserveRow[5]);
          assert.equal(reserveRows[12][6], reserveRow[6]);
          assert.equal(reserveRows[12][7], reserveRow[7]);
          assert.equal(reserveRows[12][8], reserveRow[8]);
        });
      });
  
      describe("Проверка удаления строки", function() {
        let reserveRow;
        let reserveRows;
  
        it("Удаление строки", function() {
          idColumnNumber = 0;
          idValue = new Date("07.02.2020 21:05:12");
          reserveRows = dataAdapter.getActiveReserveRows();
          reserveRow = reserveRows[12];
  
          dataAdapter.deleteReserveRow(idColumnNumber, idValue);
          reserveRows = dataAdapter.getActiveReserveRows();
        });
  
        it("Проверка количеств строк", function() {
          assert.equal(reserveRows.length, 12);
        });
  
        it("Проверка последней строки", function() {
          assert.deepEqual(reserveRows[11][0], reserveRow[0]);
          assert.equal(reserveRows[11][1], reserveRow[1]);
          assert.equal(reserveRows[11][2], reserveRow[2]);
          assert.deepEqual(reserveRows[11][3], reserveRow[3]);
          assert.deepEqual(reserveRows[11][4], reserveRow[4]);
          assert.equal(reserveRows[11][5], reserveRow[5]);
          assert.equal(reserveRows[11][6], reserveRow[6]);
          assert.equal(reserveRows[11][7], reserveRow[7]);
          assert.equal(reserveRows[11][8], reserveRow[8]);
        });
      });
    });
  });
