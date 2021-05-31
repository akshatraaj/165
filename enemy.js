
AFRAME.registerComponent("enemy-fireballs", {
    init: function () {        
        setInterval(this.shootEnemyMonster, 2000)
    },
    shootEnemyMonster: function () {
        var scene = document.querySelector("#scene");

        //enemyMonster entity
        var enemyMonster = document.querySelectorAll(".enemy");   
            
        for (var i = 0; i < enemyMonster.length; i++) {

       //create fireballs
        var fireball = document.createElement("a-entity");

        fireball.setAttribute("class","fireball")
        fireball.setAttribute("gltf-model", "./models/fireball/scene.gltf");
        fireball.setAttribute("dynamic-body", { mass: 0 });
     
        var pos=enemyMonster[i].getAttribute("position")

        fireball.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
        });
        fireball.setAttribute("scale", {
            x: 0.05,
            y: 0.05,
            z: 0.05,
        });

        scene.appendChild(fireball);      

        var position1 = new THREE.Vector3();
        var position2 = new THREE.Vector3();


        var player =  document.querySelector("#weapon").object3D
        var enemy_fireball = fireball.object3D;
        player.getWorldPosition(position1);
        enemy_fireball.getWorldPosition(position2);

        //set the velocity and it's direction
        var direction = new THREE.Vector3();

        direction.subVectors(position1, position2).normalize();

        fireball.setAttribute("velocity", direction.multiplyScalar(20));

        /******************************************************************************************* */

        //check player life
        var element = document.querySelector("#countLife");
        var playerLife = parseInt(element.getAttribute("text").value);

        //collide event on enemy bullets
        fireball.addEventListener("collide", function (e) {
           
            if (e.detail.body.el.id === "weapon") {               
                if (playerLife > 0) {
                    playerLife -= 1;
                    element.setAttribute("text", {
                        value: playerLife
                    });
                }
                if (playerLife <= 0) {
                    //show text
                    var txt = document.querySelector("#over");
                    txt.setAttribute("visible", true);

                    //remove monsters
                    var El = document.querySelectorAll(".enemy")
                    for (var i = 0; i < El.length; i++) {
                        scene.removeChild(El)
                    }

                }

            }
        });

    }
    },
    

});
