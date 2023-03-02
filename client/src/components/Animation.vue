<script></script>
<template lang="pug">
- var texts = ["M", "a","s","t","e","r","p","l","a", "n"];
- var number_of_particle = 12;

- for (var i = 0; i < texts.length; i++)
  .background(class="background" + i)
.criterion
  - for (var i = 0; i < texts.length; i++)
    .text(class='text' + i) #{texts[i]}
  - for (var i = 0; i < texts.length; i++)
    .frame(class='frame' + i)
  - for (var i = 0; i < texts.length; i++)
    - for (var j = 0; j < number_of_particle; j++)
      .particle(class="particle" + i + j)
</template>

<style scoped lang="stylus">

/**
* get random number.
* @param {number} min - min number.
* @param {number} max - max number.
*/

random(min,max)
  return floor(math(0, 'random') * (max - min + 1) + min)

/*
* variable
*/

_number_of_text = 10;
_number_of_particle = 12;
_mult_num_text = 360 / _number_of_text;
_mult_num_particle = 360 / _number_of_particle;
_width = 40;
_height = 40;
//add colors that reflect every guild
//colors = ( #E0137E #8431BF #2388C4 #E0137E #8431BF #2388C4 #E0137E #8431BF #2388C4 #2388C4)
colors = ( hsl(0 * _mult_num_text, 80%, 60%) hsl(1 * _mult_num_text, 80%, 60%) hsl(2 * _mult_num_text, 80%, 60%) hsl(3 * _mult_num_text, 80%, 60%) hsl(4 * _mult_num_text, 80%, 60%) hsl(5 * _mult_num_text, 80%, 60%) hsl(6 * _mult_num_text, 80%, 60%) hsl(7 * _mult_num_text, 80%, 60%) hsl(8 * _mult_num_text, 80%, 60%) hsl(9 * _mult_num_text, 80%, 60%))


.criterion
  font-size: 1.6rem;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 0;
  width: 0;
  transform: translate(-(_width / 2)px, -(_height / 2)px);

/*
* background
*/

.background
  position: absolute;
  top: 0;
  height: 100vh;
  width: 0;
  animation: background-animation 2s ease-in-out 4s 1 normal forwards;
for i in (0.._number_of_text)
  .background{i}
    left: 12.5% * i;
    height: 100vh;
    background-color: colors[i]

@keyframes background-animation
  0%
    width: 0;
  50%
    width: 12.5%;
    opacity: 1;
  100%
    opacity: 0;
    width: 25%;

/*
* text
*/

.text
  position: absolute;
  width: _width px;
  line-height: _height px;
  opacity: 0;
  overflow: hidden;
  &::after
    z-index: -1;
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: _height px;

for i in (0.._number_of_text)
  .text{i}
    left: -(_number_of_text / 2 - i) * _width + (_width / 2) px;
    top: 0;
    animation: text-animation + i 1s ease-in-out 1s + (i * 200)ms 1 normal forwards,
               text2-animation + i 2s ease-in-out 5s 1 normal forwards;
    &::after
      animation: text-after-animation + i 2s ease-in-out 3s 1 normal forwards;

for i in (0.._number_of_text)
  @keyframes text-animation{i}
    0%
      transform: scale(0, 0);
      opacity: 0;
    50%
      transform: scale(3, 3);
    100%
      transform: scale(1, 1);
      opacity: 1;

for i in (0.._number_of_text)
  @keyframes text-after-animation{i}
    0%
      width: 0px;
      background-color: colors[i]
      opacity: 1;
    50%
      width: _width px;
      opacity: 1;
    100%
      left: _width px;
      opacity: 0;

for i in (0.._number_of_text)
  @keyframes text2-animation{i}
      0%
        left: -(_number_of_text / 2 - i) * _width + (_width / 2) px;
        opacity: 1;
      50%
        left: -(_number_of_text / 2 - i - 1) * _width + (_width / 2) px;
        opacity: 0;
      100%
        left: -(_number_of_text / 2 - i - 1) * _width + (_width / 2) px;
        opacity: 0;

/*
* frame
*/

.frame
  position: absolute;
  width: _width px;
  height: _height px;
  border-radius: 50%;
  opacity: 0;

for i in (0.._number_of_text)
  .frame{i}
    left: -(_number_of_text / 2 - i) * _width + (_width / 2) px;
    top: 0;
    animation: frame-animation + i 1s ease-in-out (i * 200)ms 1 normal forwards;
    background-color: colors[i];

for i in (0.._number_of_text)
   @keyframes frame-animation{i}
     0%
       transform: translateY(-1000px);
       opacity: 1;
     50%
       opacity: 0.8;
     100%
       transform: translateY(0);
       opacity: 0;

/*
* particle
*/

.particle
  position: absolute;
  width: _width px;
  height: _height px;
  border-radius: 50%;

for i in (0.._number_of_text)
  for j in (0.._number_of_particle)
    .particle{i}{j}
      left: -(_number_of_text / 2 - i) * _width + (_width / 2) px;
      opacity: 0;
      background-color: colors[i];
      animation: particle-animation + i + j 1s ease-in-out 1s + (i * 200)ms 1 normal forwards;

for i in (0.._number_of_text)
  for j in (0.._number_of_particle)
    @keyframes particle-animation{i}{j}
      0%
        left: -(_number_of_text / 2 - i) * _width + (_width / 2) px;
        top: 0;
        opacity: 0;
        transform: scale(1, 1);
      100%
        left: -(_number_of_text / 2 - i) * _width + (_width / 2) + cos(j * _mult_num_particle deg) * 100 px;
        top: sin(j * _mult_num_particle deg) * 100 px;
        opacity: 1;
        transform: scale(0, 0);
</style>
