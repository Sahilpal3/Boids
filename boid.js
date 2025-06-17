

class Boid {
  constructor() {
    this.position = createVector(random(width),random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    //the random range controls thier starting velocity
    //without his the boids appear in a perfect circle
    this.acceleration = createVector();
    // control how much force can be applied at max
    this.maxForce = 1;
    this.maxSpeed = 4;
    //controls speed
  }

  edges(){
    // any boid crosses edge they appear on the other side
    if(this.position.x>width){
        this.position.x=0;
    }else if(this.position.x<0){
        this.position.x = width;
    }
    if(this.position.y>height){
        this.position.y=0;
    }else if(this.position.y<0){
        this.position.y = height;
    }
  }

  flock(boids){
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let seperation = this.seperation(boids);

    seperation.mult(seperationSlider.value());
    cohesion.mult(cohesionSlider.value());
    alignment.mult(alignSlider.value());

    this.acceleration.add(seperation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
  }

  align(boids) {
    let perceptionRadius = 50;
    //very important value
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if(total>0){
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 100;
    let avglocation = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        avglocation.add(other.position);
        total++;
      }
    }
    if(total>0){
        avglocation.div(total);
        avglocation.sub(this.position)
        avglocation.setMag(this.maxSpeed);
        avglocation.sub(this.velocity);
        avglocation.limit(this.maxForce);
    }
    return avglocation;
  }

  seperation(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position,other.position);
        diff.div(d*d);
        // divide by d because we want the farther the other boid lower its magnitude & vice versa.
        steering.add(diff);
        total++;
      }
    }
    if(total>0){
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
    }
    return steering;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
    //reset acceleartion after each calculation cycle

    if (mouseFollow) {
  let mouseForce = createVector(mouseX, mouseY).sub(this.position);
  mouseForce.setMag(0.5); // adjust force strength
  this.acceleration.add(mouseForce);
}
  }
  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
  }
}
