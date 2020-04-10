const naruto_game = (function () {
   let app = {
      gameContainers: {
         main: document.querySelector("#mainContainer"),
         welcome: document.querySelector(".welcome"),
         game: document.querySelector(".game"),
         gameover: document.querySelector(".gameover"),
         victory: document.querySelector(".victory")
      },
      sound: {
         bossmusic: document.querySelector("#bossmusic"),
         gameover: document.querySelector("#gameover"),
         finalbossmusic: document.querySelector("#finalbossmusic"),
         victory: document.querySelector("#victorymusic"),
         rasengan: document.querySelector("#rasengan"),
         rasenshuriken: document.querySelector("#rasenshuriken"),
         kagebunshin: document.querySelector("#kagebunshin"),
         nochakra: document.querySelector("#nochakra"),
         beep: document.querySelector("#beep"),
         shinratensei: document.querySelector("#shinratensei"),
         shuriken1: document.querySelector("#shuriken1"),
         shuriken2: document.querySelector("#shuriken2"),
         shuriken3: document.querySelector("#shuriken3")
      },
      intervalTimer: '',
      boss: {
         el: document.querySelector(".boss"),
         level: 1,
         life: 0
      },
      levelTime: {
         el: document.querySelector(".levelTime"),
         time: 0
      },
      shuriken: {
         el: document.querySelector(".shuriken"),
         dmg: 1,
         gainChakra: 2
      },
      rasengan: {
         el: document.querySelector(".btn-rasengan"),
         dmg: 25,
         chakra: 25
      },
      rasenshuriken: {
         el: document.querySelector(".btn-rasenshuriken"),
         dmg: 125,
         chakra: 100
      },
      kagebunshin: {
         button: document.querySelector(".btn-kagebunshin"),
         el_counter: document.querySelector(".counter-kagebunshin"),
         el_chakra: document.querySelector(".chakra-counter-kagebunshin"),
         counter: 0,
         dmg: 1,
         chakra: 5
      },
      damagePerSecond: {
         el: document.querySelector(".damagePerSecond"),
         counter: 0
      },
      chakra: {
         el: document.querySelector(".chakra"),
         counter: 0
      }
   };

   app.shuriken.el.addEventListener('mousedown', function () {
      let randomNumber = Math.floor(Math.random() * 3) + 1; // Random 1 - 3

      if (randomNumber == 1) {
         app.gameContainers.main.classList.add("shake");
         app.gameContainers.main.addEventListener("webkitAnimationEnd", function () {
            app.gameContainers.main.classList.remove("shake");
         });
      }
      app.sound['shuriken' + randomNumber].play();

      app.boss.life -= app.shuriken.dmg;
      app.chakra.counter += app.shuriken.gainChakra;
      updateApp();
      if (app.boss.life <= 0) {
         winLevel();
      }
   });

   app.rasengan.el.addEventListener('mousedown', function () {
      if (app.chakra.counter >= app.rasengan.chakra) {
         littleclimax();
         app.sound.rasengan.play();
         app.chakra.counter -= app.rasengan.chakra;
         app.boss.life -= app.rasengan.dmg;
         updateApp();
      } else semChakraSuficiente();
   });

   app.rasenshuriken.el.addEventListener('mousedown', function () {
      if (app.chakra.counter >= app.rasenshuriken.chakra) {
         climax();
         app.sound.rasenshuriken.play();
         app.chakra.counter -= app.rasenshuriken.chakra;
         app.boss.life -= app.rasenshuriken.dmg;
         updateApp();
      } else semChakraSuficiente();
   });

   app.kagebunshin.button.addEventListener('mousedown', function () {
      if (app.chakra.counter >= app.kagebunshin.chakra) {
         littleclimax();
         app.sound.kagebunshin.play();
         app.chakra.counter -= app.kagebunshin.chakra;
         app.kagebunshin.counter += 1;
         app.kagebunshin.chakra += 2;
         app.damagePerSecond.counter += app.kagebunshin.dmg;

         app.kagebunshin.el_counter.textContent = app.kagebunshin.counter;
         updateApp();
      } else semChakraSuficiente();
   });

   function updateApp() {
      app.boss.el.textContent = app.boss.life;
      app.levelTime.el.textContent = app.levelTime.time;
      app.kagebunshin.el_counter.textContent = app.kagebunshin.counter;
      app.kagebunshin.el_chakra.textContent = app.kagebunshin.chakra;
      app.damagePerSecond.el.textContent = app.damagePerSecond.counter;
      app.chakra.el.textContent = app.chakra.counter;

      if (app.boss.life <= 0) {
         app.boss.el.textContent = "MORTO";
      };

      if (app.chakra.counter < app.rasengan.chakra) {
         grayscale(app.rasengan.el, true);
      } else grayscale(app.rasengan.el, false);

      if (app.chakra.counter < app.rasenshuriken.chakra) {
         grayscale(app.rasenshuriken.el, true);
      } else grayscale(app.rasenshuriken.el, false);

      if (app.chakra.counter < app.kagebunshin.chakra) {
         grayscale(app.kagebunshin.button, true);
      } else grayscale(app.kagebunshin.button, false);
   }

   function grayscale(el, dissature) {
      if (dissature) {
         el.style.filter = "grayscale(100%)";
      } else el.style.filter = "grayscale(0)";
   }

   function climax() {
      let climax = document.querySelector('#climax');
      if (climax.classList.contains("climax")) {
         climax.classList.remove("climax");
      };
      setTimeout(() => {
         climax.classList.add("climax");
      }, 100);
   }

   function littleclimax() {
      let littleclimax = document.querySelector('#littleclimax');
      if (littleclimax.classList.contains("littleclimax")) {
         littleclimax.classList.remove("littleclimax");
      };
      setTimeout(() => {
         littleclimax.classList.add("littleclimax");
      }, 100);
   }

   function semChakraSuficiente() {
      app.sound.nochakra.play();
      document.querySelectorAll(".message").forEach(e => e.parentNode.removeChild(e));
      let e = document.createElement('div');
      e.classList.add("message");
      e.innerHTML = "Chakra insuficiente";
      document.querySelector('.container-shuriken').appendChild(e);
   }

   function buildApp() {
      document.querySelector('html').backgroundImage = "url('./img/bg.jpg')";
      app.kagebunshin.counter = 0;
      app.kagebunshin.chakra = 3;
      app.damagePerSecond.counter = 0;
      app.chakra.counter = 0;

      switch (app.boss.level) {
         case 1:
            app.boss.life = 100;
            app.levelTime.time = 60;
            break;
         case 2:
            app.boss.life = 200;
            app.levelTime.time = 60;
            break;
         case 3:
            app.boss.life = 300;
            app.levelTime.time = 60;
            break;
         case 4:
            app.boss.life = 100;
            app.levelTime.time = 20;
            break;
         case 5:
            app.boss.life = 500;
            app.levelTime.time = 60;
            break;
         case 6:
            app.boss.life = 600;
            app.levelTime.time = 60;
            break;
         case 7:
            app.boss.life = 200;
            app.levelTime.time = 20;
            break;
         case 8:
            app.boss.life = 300;
            app.levelTime.time = 20;
            break;
         case 9:
            app.boss.life = 1000;
            app.levelTime.time = 60;
            break;
         case 10:
            document.querySelector("html").classList.remove("bg-victory", "bg-principal", "bg-gameover");
            document.querySelector("html").classList.add("bg-finalboss");
            app.sound.bossmusic.pause();
            app.sound.finalbossmusic.currentTime = 0;
            app.sound.finalbossmusic.play();
            app.boss.life = 5000;
            app.levelTime.time = 180;
            break;
         default:
            document.querySelector("html").classList.remove("bg-finalboss", "bg-principal", "bg-gameover");
            document.querySelector("html").classList.add("bg-victory");
            app.sound.finalbossmusic.pause();
            app.sound.victory.currentTime = 0;
            app.sound.victory.play();
            app.gameContainers.game.classList.add("display-none");
            app.gameContainers.gameover.classList.add("display-none");
            app.gameContainers.victory.classList.remove("display-none");
            break;
      }

      updateApp();
      startLevel();
   }

   function resetApp() {
      document.querySelector("html").classList.remove("bg-finalboss", "bg-victory", "bg-gameover");
      document.querySelector("html").classList.add("bg-principal");
      app.boss.level = 1;
      app.sound.gameover.pause();
      app.sound.bossmusic.currentTime = 0;
      app.sound.bossmusic.play();
      app.gameContainers.game.classList.remove("display-none");
      app.gameContainers.victory.classList.add("display-none");
      app.gameContainers.gameover.classList.add("display-none");
      app.levelTime.el.classList.remove("text-danger");
      buildApp();
   }

   function startLevel() {
      app.intervalTimer = setInterval(function () {
         if (app.levelTime.time == 0) {
            gameOver();
         } else {
            app.boss.life -= app.damagePerSecond.counter;
            if (!bossDerrotado()) {
               app.levelTime.time -= 1;
               app.levelTime.el.textContent = app.levelTime.time;
               if (app.levelTime.time < 10) {
                  if (!app.levelTime.el.classList.contains("text-danger"))
                     app.levelTime.el.classList.add("text-danger");
                  app.sound.beep.play();
               } else {
                  if (app.levelTime.el.classList.contains("text-danger"))
                     app.levelTime.el.classList.remove("text-danger");
               }
            } else {
               winLevel();
            }
            updateApp();
         }
      }, 1000);
   }

   function bossDerrotado() {
      if (app.boss.life <= 0) {
         return true;
      } else {
         return false;
      }
   }

   function startApp() {
      app.sound.shinratensei.play();
      app.sound.bossmusic.play();
      app.gameContainers.welcome.classList.add("display-none");
      app.gameContainers.game.classList.remove("display-none");
      buildApp();
   }

   function gameOver() {
      app.gameContainers.game.classList.add("display-none");
      app.gameContainers.victory.classList.add("display-none");
      app.gameContainers.gameover.classList.remove("display-none");
      clearInterval(app.intervalTimer);

      app.sound.finalbossmusic.pause();
      app.sound.bossmusic.pause();
      app.sound.gameover.currentTime = 0;
      app.sound.gameover.play();
      document.querySelector("html").classList.remove("bg-finalboss", "bg-victory", "bg-principal");
      document.querySelector("html").classList.add("bg-gameover");
   }

   function winLevel() {
      clearInterval(app.intervalTimer);
      app.boss.level += 1;
      document.querySelector(".level").textContent = app.boss.level;
      if (app.boss.level < 12) {
         swal({
            title: 'Você Ganhou!',
            text: "Bora pro próximo nível? :)",
            type: 'success',
            allowOutsideClick: false,
            showCancelButton: false,
            confirmButtonColor: 'rgb(137, 195, 90)',
            confirmButtonText: 'BORA'
         }).then((result) => {
            if (result.value) {
               buildApp();
            }
         });
      };
   }

   return {
      startApp: startApp,
      win: winLevel,
      gameOver: gameOver,
      resetApp: resetApp
   };
})();