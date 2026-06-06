import { gameState } from "./game-state.js";

export function createCube(scene) {

    const spacing = 1.2;

    for (let z = 0; z < 3; z++) {

        for (let y = 0; y < 3; y++) {

            for (let x = 0; x < 3; x++) {

                const geometry =
                    new THREE.BoxGeometry(1,1,1);

                const material =
                    new THREE.MeshPhongMaterial({
                        color: 0x4a90e2
                    });

                const cube =
                    new THREE.Mesh(
                        geometry,
                        material
                    );

                cube.position.set(
                    (x - 1) * spacing,
                    (y - 1) * spacing,
                    (z - 1) * spacing
                );

                cube.userData = {
                    x,
                    y,
                    z
                };

                scene.add(cube);

                gameState.cellMeshes.push(cube);
            }
        }
    }
}