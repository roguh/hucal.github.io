// Generated by CoffeeScript 1.9.2
var add_all, c, camera, camera_far, clear_scene, color_dir, colors, container, controls, current_color, i, j, k, l, len, len1, lines, m, m_, make_rotation, max, obj, points, r2, r2_canvas, r2_points, r2_resolution, r2_stage, r2_texture, r3_points, read_input_matrix, redraw, ref, ref1, ref2, render, renderer, s, s2, s2_points, scene, show_r2, show_r3, show_s2, t, theta, trans_r2_plane, transform, write_input_matrix, x, y;

if (!Detector.webgl) {
  $('div#vis').prepend('<h2>The visualization requires WebGL.</h2>');
}

if (!Detector.canvas) {
  $('div#vis').prepend('<h2>The visualization requires the HTML5 Canvas.</h2>');
}

container = document.getElementById('vis');

scene = new THREE.Scene;

scene.fog = new THREE.FogExp2(0xffffff, 0.002);

camera_far = 10000;

camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, camera_far);

renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(container.offsetWidth, container.offsetHeight);

renderer.setClearColor(scene.fog.color, 1);

renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  return renderer.setSize(container.offsetWidth, container.offsetHeight);
});

r2_canvas = document.createElement('canvas');

r2_resolution = 1024;

r2_canvas.width = r2_canvas.height = r2_resolution;

r2_stage = new createjs.Stage(r2_canvas);

make_plane(root_objects, 2, 0xbbffbb);

make_point(root_objects, 0.02, 0xffffff, 1.0, 50);

s2 = make_point(s2_points, 2, 0x101010, 1.0, 50);

r2_texture = new THREE.Texture(r2_canvas);

r2_texture.needsUpdate = true;

r2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: r2_texture,
  transparent: true
}));

r2.position.z = 1;

max = 10;

for (i = j = ref = -max, ref1 = max; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
  r2_stage.addChild(canvas_line([i / max, 1], [i / max, -1], 0x222222, 1));
  r2_stage.addChild(canvas_line([1, i / max], [-1, i / max], 0x222222, 1));
}

scene.add(new THREE.AmbientLight(0x404040));

scene.add(new THREE.HemisphereLight(0xffffff, 0x404040, 1));

for (k = 0, len = root_objects.length; k < len; k++) {
  obj = root_objects[k];
  scene.add(obj);
}

x = y = 0.1;

theta = PI / 4;

c = Math.cos(theta);

s = Math.sin(theta);

m = new THREE.Matrix3().set(c, 0.1, x, 0, s, y, 0, 0.4, 1);

t = function(m, p) {
  return array2_from_vec3(vec3_from_array(p).applyMatrix3(m));
};

points = [
  {
    'p': [0, 0],
    'c': 0xff0000
  }, {
    'p': [0.5, 0.5],
    'c': 0xff00f0
  }, {
    'p': [-0.4, 0.6],
    'c': 0xfff000
  }
];

lines = [
  {
    'p1': [0.2, 0.2],
    'p2': [-0.3, 0.4],
    'c': 0xaa0ff
  }, {
    'p1': [-0.2, -0.1],
    'p2': [0, 0.1],
    'c': 0xff0aa
  }
];

r2_points = new Array();

s2_points = new Array();

r3_points = new Array();

clear_scene = function() {
  var l, len1, len2, len3, n, o, ref2, ref3;
  ref2 = [r2];
  for (l = 0, len1 = ref2.length; l < len1; l++) {
    obj = ref2[l];
    obj.updateMatrix();
    obj.position.set(0, 0, 0);
    obj.rotation.set(0, 0, 0);
    obj.scale.set(1, 1, 1);
    obj.updateMatrix();
    scene.remove(obj);
  }
  r2.position.z = 1;
  ref3 = r3_points.concat(s2_points);
  for (n = 0, len2 = ref3.length; n < len2; n++) {
    obj = ref3[n];
    scene.remove(obj);
  }
  for (o = 0, len3 = r2_points.length; o < len3; o++) {
    obj = r2_points[o];
    r2_stage.removeChild(obj);
  }
  r2_stage.update();
  r2.material.map.needsUpdate = true;
  r2_points = new Array();
  s2_points = new Array();
  return r3_points = new Array();
};

m_ = 0;

add_all = function(m, show_r2, show_s2, show_r3, trans_r2_plane) {
  var l, len1, len2, len3, len4, len5, n, o, p, q, r, u, v, w;
  if (show_r2 == null) {
    show_r2 = true;
  }
  if (show_s2 == null) {
    show_s2 = true;
  }
  if (show_r3 == null) {
    show_r3 = true;
  }
  if (trans_r2_plane == null) {
    trans_r2_plane = false;
  }
  for (l = 0, len1 = points.length; l < len1; l++) {
    p = points[l];
    make_p_point(t(m, p.p), p.p, p.c, trans_r2_plane);
  }
  for (n = 0, len2 = lines.length; n < len2; n++) {
    p = lines[n];
    make_p_line(t(m, p.p1), t(m, p.p2), p.p1, p.p2, p.c, 1.0, true, trans_r2_plane);
  }
  if (show_r3) {
    for (o = 0, len3 = r3_points.length; o < len3; o++) {
      obj = r3_points[o];
      scene.add(obj);
    }
  }
  if (show_s2) {
    for (q = 0, len4 = s2_points.length; q < len4; q++) {
      obj = s2_points[q];
      scene.add(obj);
    }
  }
  if (show_r2) {
    scene.add(r2);
    for (u = 0, len5 = r2_points.length; u < len5; u++) {
      obj = r2_points[u];
      r2_stage.addChild(obj);
    }
    if (trans_r2_plane) {
      m_ = new THREE.Matrix4().identity();
      for (r = v = 0; v <= 2; r = ++v) {
        for (c = w = 0; w <= 2; c = ++w) {
          m_.elements[r * 4 + c] = m.elements[r * 3 + c];
        }
      }
      r2.applyMatrix(m_);
      r2.updateMatrix();
      console.log(r2.matrix);
    }
  }
  r2_stage.update();
  return r2.material.map.needsUpdate = true;
};

transform = new THREE.Matrix3();

show_r2 = show_s2 = show_r3 = true;

trans_r2_plane = false;

redraw = function() {
  clear_scene();
  return add_all(transform, show_r2, show_s2, show_r3, trans_r2_plane);
};

camera.position.z = 3;

theta = -PI * 1 / 2;

camera.position.y = 2.5 * Math.sin(theta);

camera.position.x = 2.5 * Math.cos(theta);

controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

controls.dampingFactor = 1.0;

controls.enablePan = false;

render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  return controls.update();
};

write_input_matrix = function(m, dim, id_prefix) {
  var l, r, ref2, results;
  if (dim == null) {
    dim = 3;
  }
  if (id_prefix == null) {
    id_prefix = "input#trans_";
  }
  results = [];
  for (r = l = 1, ref2 = dim; 1 <= ref2 ? l <= ref2 : l >= ref2; r = 1 <= ref2 ? ++l : --l) {
    results.push((function() {
      var n, ref3, results1;
      results1 = [];
      for (c = n = 1, ref3 = dim; 1 <= ref3 ? n <= ref3 : n >= ref3; c = 1 <= ref3 ? ++n : --n) {
        results1.push($(id_prefix + ('' + r) + ('' + c)).val(m.elements[(c - 1) * dim + (r - 1)]));
      }
      return results1;
    })());
  }
  return results;
};

read_input_matrix = function(dim, id_prefix) {
  var a, l, n, r, ref2, ref3;
  if (dim == null) {
    dim = 3;
  }
  if (id_prefix == null) {
    id_prefix = "input#trans_";
  }
  a = Array(dim * dim);
  for (r = l = 1, ref2 = dim; 1 <= ref2 ? l <= ref2 : l >= ref2; r = 1 <= ref2 ? ++l : --l) {
    for (c = n = 1, ref3 = dim; 1 <= ref3 ? n <= ref3 : n >= ref3; c = 1 <= ref3 ? ++n : --n) {
      a[(c - 1) * dim + (r - 1)] = parseFloat($(id_prefix + ('' + r) + ('' + c)).val());
    }
  }
  return new THREE.Matrix3().fromArray(a);
};

ref2 = [
  {
    'checkbox': 'input#show_r2',
    'f': function() {
      show_r2 = this.checked;
      return redraw();
    }
  }, {
    'checkbox': 'input#show_s2',
    'f': function() {
      show_s2 = this.checked;
      return redraw();
    }
  }, {
    'checkbox': 'input#show_r3',
    'f': function() {
      show_r3 = this.checked;
      return redraw();
    }
  }
];
for (l = 0, len1 = ref2.length; l < len1; l++) {
  c = ref2[l];
  $(c.checkbox).prop('checked', true).change(c.f);
}

$('button#apply_trans').click(function() {
  transform = read_input_matrix();
  trans_r2_plane = false;
  return redraw();
});

$('button#apply_trans_plane').click(function() {
  transform = read_input_matrix();
  trans_r2_plane = true;
  return redraw();
});

THREE.Matrix3.prototype.multiply = function(other) {
  return this.multiplyMatrices(this, other);
};

THREE.Matrix3.prototype.multiplyMatrices = function(a, b) {
  var a11, a12, a13, a21, a22, a23, a31, a32, a33, ae, b11, b12, b13, b21, b22, b23, b31, b32, b33, be;
  ae = a.elements;
  be = b.elements;
  a11 = ae[0];
  a12 = ae[3];
  a13 = ae[6];
  a21 = ae[1];
  a22 = ae[4];
  a23 = ae[7];
  a31 = ae[2];
  a32 = ae[5];
  a33 = ae[8];
  b11 = be[0];
  b12 = be[3];
  b13 = be[6];
  b21 = be[1];
  b22 = be[4];
  b23 = be[7];
  b31 = be[2];
  b32 = be[5];
  b33 = be[8];
  ae[0] = a11 * b11 + a11 * b12 + a11 * b13;
  ae[3] = a12 * b21 + a12 * b22 + a12 * b23;
  ae[6] = a13 * b31 + a13 * b32 + a13 * b33;
  ae[1] = a21 * b11 + a21 * b12 + a21 * b13;
  ae[4] = a22 * b21 + a22 * b22 + a22 * b23;
  ae[7] = a23 * b31 + a23 * b32 + a23 * b33;
  ae[2] = a31 * b11 + a31 * b12 + a31 * b13;
  ae[5] = a32 * b21 + a32 * b22 + a32 * b23;
  ae[8] = a33 * b31 + a33 * b32 + a33 * b33;
  return a;
};

make_rotation = function(theta, s, reflection) {
  if (s == null) {
    s = 1;
  }
  if (reflection == null) {
    reflection = false;
  }
  return new THREE.Matrix3().set(s * (reflection ? -1 : 1) * Math.cos(theta), -s * Math.sin(theta), 0, s * (reflection ? -1 : 1) * Math.sin(theta), s * Math.cos(theta), 0, 0, 0, 1);
};

$('button#create_sim').click(function() {
  var prefix, reflection, tx, ty;
  prefix = 'input#sim_';
  s = parseFloat($(prefix + 's').val());
  theta = parseFloat($(prefix + 'theta').val());
  theta = PI * theta / 180;
  tx = parseFloat($(prefix + 'tx').val());
  ty = parseFloat($(prefix + 'ty').val());
  reflection = $(prefix + 'reflection').prop('checked');
  m = make_rotation(theta, s, reflection);
  m.elements[6] = tx;
  m.elements[7] = ty;
  return write_input_matrix(m);
});

$('button#create_identity').click(function() {
  return write_input_matrix(new THREE.Matrix3().identity());
});

$('button#apply_identity').click(function() {
  transform = new THREE.Matrix3().identity();
  return redraw();
});

$('button#create_aff').click(function() {
  var l1, l2, phi, prefix, reflection, tx, ty;
  prefix = 'input#aff_';
  theta = parseFloat($(prefix + 'theta').val());
  theta = PI * theta / 180;
  phi = parseFloat($(prefix + 'phi').val());
  phi = PI * phi / 180;
  l1 = parseFloat($(prefix + 'l1').val());
  l2 = parseFloat($(prefix + 'l2').val());
  tx = parseFloat($(prefix + 'tx').val());
  ty = parseFloat($(prefix + 'ty').val());
  reflection = $(prefix + 'reflection').prop('checked');
  console.log(theta, phi, l1, l2, tx, ty, reflection);
  m = make_rotation(theta, 1, reflection).multiply(make_rotation(-phi).multiply(new THREE.Matrix3().set(l1, 0, 0, 0, l2, 0, 0, 0, 1).multiply(make_rotation(phi))));
  m.elements[6] = tx;
  m.elements[7] = ty;
  return write_input_matrix(m);
});

colors = [
  (function() {
    var len2, n, ref3, results;
    ref3 = ['#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'];
    results = [];
    for (n = 0, len2 = ref3.length; n < len2; n++) {
      c = ref3[n];
      results.push(parseInt(c.substr(1), 16));
    }
    return results;
  })()
][0];

current_color = 0;

color_dir = 1;

$('button#add_point').click(function() {
  if (current_color + color_dir < 0) {
    color_dir = 1;
  }
  if (current_color + color_dir > colors.length - 1) {
    color_dir = -1;
  }
  current_color += color_dir;
  x = parseFloat($('input#point_x').val());
  y = parseFloat($('input#point_y').val());
  points.push({
    'p': [x, y],
    'c': colors[current_color]
  });
  return redraw();
});

$('button#add_line').click(function() {
  var a, b;
  if (current_color + color_dir < 0) {
    color_dir = 1;
  }
  if (current_color + color_dir > colors.length - 1) {
    color_dir = -1;
  }
  current_color += color_dir;
  a = parseFloat($('input#line_a').val());
  b = parseFloat($('input#line_b').val());
  c = parseFloat($('input#line_c').val());
  lines.push({
    'p1': [1, (a - c) / b],
    'p2': [c / a, 0],
    'c': colors[current_color]
  });
  return redraw();
});

$('button#clear_all').click(function() {
  lines = [];
  points = [];
  return clear_scene();
});

redraw();

render();

//# sourceMappingURL=vis.js.map