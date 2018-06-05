function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}

function predict(x) {
  const xs = tf.tensor1d(x);
  let ys = tf.variable(tf.zerosLike(xs));
  for (let i = 0; i <= orderPoly; i++) {
    const coef = operands[i];
    const pow_ts = tf.fill(xs.shape, i);
    const sum = tf.add(ys, operands[i].mul(xs.pow(pow_ts)));
    ys.dispose();
    ys = sum.clone();
  }
  return ys;
}

function train(input, target) {
  tf.tidy(() => {
    if (input.length > 0) {
      const ys = tf.tensor1d(target);
      optimizer.minimize(() => loss(predict(input), ys));
    }
  });
}
