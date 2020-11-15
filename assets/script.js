var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var doldur = document.getElementById("doldur");
var tara = document.getElementById("tara");
var bos = document.getElementById("bos");
var polygonKoordinat = document.getElementById("polygonKoordinat");
var saveBtn = document.getElementById("jsSave");
const arrayYKoordinat = Array();
const arrayXKoordinat = Array();

const arrayCizgiX = Array();
const arrayCizgiY = Array();

var x = 0;
var y = 0;

//Koordinat Göstermek için

function koordinatGoster() {
  var xkordinasyon = 0;

  var ykordinasyon = 0;

  var ie = document.all ? true : false;

  if (!ie) document.captureEvents(Event.MOUSEMOVE);

  document.onmousemove = koordinat;

  xDeger = canvas.width + 300;
  yDeger = canvas.height;

  if (
    ykordinasyon >= 0 &&
    ykordinasyon <= yDeger &&
    xkordinasyon >= 300 &&
    xkordinasyon <= xDeger
  ) {
    document.getElementById("ykoordinat").innerHTML = ykordinasyon;
    document.getElementById("xkoordinat").innerHTML = xkordinasyon - 300;
  } else {
    document.getElementById("ykoordinat").innerHTML = "Kanvas Dışı Koordinat";
    document.getElementById("xkoordinat").innerHTML = "Kanvas Dışı Koordinat";
  }

  function koordinat(k) {
    if (ie) {
      xkordinasyon = event.clientX + document.body.scrollLeft;

      ykordinasyon = event.clientY + document.body.scrollTop;
    } else {
      xkordinasyon = k.pageX;

      ykordinasyon = k.pageY;
    }

    xDeger = canvas.width + 300;
    yDeger = canvas.height;

    if (
      ykordinasyon >= 0 &&
      ykordinasyon <= yDeger &&
      xkordinasyon >= 300 &&
      xkordinasyon <= xDeger
    ) {
      document.getElementById("ykoordinat").innerHTML = ykordinasyon;
      document.getElementById("xkoordinat").innerHTML = xkordinasyon - 300;
    } else {
      document.getElementById("ykoordinat").innerHTML = "Kanvas Dışı Koordinat";
      document.getElementById("xkoordinat").innerHTML = "Kanvas Dışı Koordinat";
    }

    return true;
  }
}

//Kanvas Boyutu Oluşturmak için

function canvasSize() {
  var xValue = document.getElementById("genislik").value;
  var yValue = document.getElementById("yukseklik").value;

  canvas.style.display = "block";

  canvas.width = xValue;
  canvas.height = yValue;

  koordinatGoster();

  document.getElementById("noktaValue").disabled = false;
  document.getElementById("cizgiValue").disabled = false;
  document.getElementById("polygonValue").disabled = false;
  document.getElementById("koordinatValue").disabled = false;
  document.getElementById("clearCanvas").disabled = false;
  document.getElementById("jsSave").disabled = false;

  document.getElementById("genislik").value = "";
  document.getElementById("yukseklik").value = "";

  document.getElementById("canvasValue").childNodes[0].nodeValue =
    "Kanvas Ayarla";
  document.getElementById("controlCanvas").style.display = "none";
}

//Nokta oluşturmak

function noktaMethod() {
  var xKoordinatNokta = document.getElementById("noktaX").value;
  var yKoordinatNokta = document.getElementById("noktaY").value;
  var noktaDeger = document.getElementById("noktaBuyukluk").value;

  if (xKoordinatNokta < 0 || yKoordinatNokta < 0) {
    alert("Hatalı giriş yaptınız.");
  } else {
    ctx.beginPath();
    ctx.arc(xKoordinatNokta, yKoordinatNokta, noktaDeger * 3.3, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
  }
  document.getElementById("noktaX").value = "";
  document.getElementById("noktaY").value = "";
}

//Çizgi oluşturmak

function cizgiMethod() {
  var cizgiDeger = document.getElementById("cizgiBuyukluk").value;
  document.getElementById("cizgiButton").childNodes[0].nodeValue =
    y + 2 + "." + "Koordinat";

  arrayCizgiX[y] = document.getElementById("cizgiX").value;
  arrayCizgiY[y] = document.getElementById("cizgiY").value;

  if (y >= 1) {
    ctx.beginPath();
    for (var j = y-1; j < arrayCizgiY.length; j++) {
      ctx.lineTo(arrayCizgiX[j], arrayCizgiY[j]);
      ctx.lineWidth = cizgiDeger;
      ctx.stroke();
    }
  }
  y++;
  document.getElementById("cizgiX").value = "";
  document.getElementById("cizgiY").value = "";
}

//Çokgen oluşturmak

function cokgenMethod() {
  document.getElementById("buttonValue").childNodes[0].nodeValue =
    x + 2 + "." + "Koordinat";

  arrayXKoordinat[x] = document.getElementById("cokgenX").value;
  arrayYKoordinat[x] = document.getElementById("cokgenY").value;

  if (x != 0) {
    if (
      arrayXKoordinat[0] == arrayXKoordinat[x] &&
      arrayYKoordinat[0] == arrayYKoordinat[x]
    ) {
      ctx.beginPath();
      for (var j = 0; j < arrayYKoordinat.length; j++) {
        ctx.lineTo(arrayXKoordinat[j], arrayYKoordinat[j]);
        ctx.stroke();
      }
      ctx.closePath();
      x=-1;
      if (tara.checked == true) {
        var imageObj = new Image();
        imageObj.onload = function() {
          var pattern = ctx.createPattern(imageObj, 'repeat');
          ctx.fillStyle = pattern;
          ctx.fill();
        };
        imageObj.src = './assets/images/tarali.jpg';
      }

      if (doldur.checked == true) { 
        ctx.fillStyle = "black";
        ctx.fill();
      }

      if (bos.checked == true) {
        ctx.lineWidth = 2;
      }

       document.getElementById("buttonValue").childNodes[0].nodeValue =
         "1.Koordinat";
      //document.getElementById("buttonValue").disabled = true;
    }
  }
  if(x != -1){
    polygonKoordinat.innerHTML += `
    </br>
    <input class="form-control-sm btn-primary" style="width: 125px;display: inline-block;background-color : #d4d4d4;" type="text" readonly placeholder=${"X&nbsp;Koordinatı&nbsp;:&nbsp;" + arrayXKoordinat[x]} >
    <input class="form-control-sm" style="width: 125px;display: inline-block;background-color : #d4d4d4;" type="text" readonly placeholder=${"Y&nbsp;Koordinatı&nbsp;:&nbsp;" + arrayYKoordinat[x]} > 
    </br>
    `;
  }else{
    polygonKoordinat.innerHTML += `<hr style="border-top: 1px solid white;">`
  }

  x++;
  document.getElementById("cokgenX").value = "";
  document.getElementById("cokgenY").value = "";
}

//Canvas Gizle/Göster

function canvasGizleGoster() {
  var gizleCanvas = document.getElementById("controlCanvas");

  if (gizleCanvas.style.display === "none") {
    document.getElementById("canvasValue").childNodes[0].nodeValue = "Gizle";
    gizleCanvas.style.display = "block";
  } else {
    document.getElementById("canvasValue").childNodes[0].nodeValue =
      "Kanvas Ayarla";
    gizleCanvas.style.display = "none";
  }
}

//Nokta Gizle/Göster

function noktaGizleGoster() {
  var gizleNokta = document.getElementById("controlNokta");

  if (gizleNokta.style.display === "none") {
    document.getElementById("noktaValue").childNodes[0].nodeValue = "Gizle";
    gizleNokta.style.display = "block";
  } else {
    document.getElementById("noktaValue").childNodes[0].nodeValue = "Nokta";
    gizleNokta.style.display = "none";
  }
}

//Çizgi Gizle/Göster

function cizgiGizleGoster() {
  var gizleCizgi = document.getElementById("controlCizgi");

  if (gizleCizgi.style.display === "none") {
    document.getElementById("cizgiValue").childNodes[0].nodeValue = "Gizle";
    gizleCizgi.style.display = "block";
  } else {
    document.getElementById("cizgiValue").childNodes[0].nodeValue = "Çizgi";
    gizleCizgi.style.display = "none";
  }
}

//Polygon Gizle/Göster

function polygonGizleGoster() {
  var gizlePolygon = document.getElementById("controlPolygon");

  if (gizlePolygon.style.display === "none") {
    document.getElementById("polygonValue").childNodes[0].nodeValue = "Gizle";
    gizlePolygon.style.display = "block";
  } else {
    document.getElementById("polygonValue").childNodes[0].nodeValue = "Polygon";
    gizlePolygon.style.display = "none";
  }
}

//Koordinat Gizle/Göster

function koordinatGizleGoster() {
  var gizlePolygon = document.getElementById("controlKoordinat");

  if (gizlePolygon.style.display === "none") {
    document.getElementById("koordinatValue").childNodes[0].nodeValue = "Gizle";
    gizlePolygon.style.display = "block";
  } else {
    document.getElementById("koordinatValue").childNodes[0].nodeValue =
      "Koordinat";
    gizlePolygon.style.display = "none";
  }
}

//Canvas Kaydetme

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

function handleSaveClick() {
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  var image = canvas.toDataURL();
  var link = document.createElement("a");
  link.href = image;
  link.download = "Canvas";
  link.click();
}

