import {
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Car, Bike } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { Header } from "./Header";
import { Modal } from "../components/Modal";
import { CardCar } from "../components/CardCar";
import { formatPrice } from "../utils/formatPrice";
import { Layout } from "../layout/Layout";

interface Car {
  id: string;
  brand: string;
  model: string;
  yearFactor: number;
  yearModification: number;
  price: number;
  location: string;
  door: string;
  type: string;
  color: string;
  images: string[];
  description: string;
  // options: OptionsProps[];
}

interface Bike {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  color: string;
  location: string;
  images: string[];
  description: string;
}

export function Dashboard() {
  const [carData, setCarData] = useState<Car[]>([]);
  const [bikeData, setBikeData] = useState<Bike[]>([]);

  const [editingCarId, setEditingCarId] = useState<Car | null>(null);
  const [editingBikeId, setEditingBikeId] = useState<Bike | null>(null);

  const [loading, setLoading] = useState(true);
  const [isModalOpenCar, setIsModalOpenCar] = useState<boolean>(false);
  const [isModalOpenBike, setIsModalOpenBike] = useState<boolean>(false);

  const ref = useRef(null);

  const editableCar = (id: string) => {
    const carEdit = carData.find((car) => car.id === id);
    if (carEdit) {
      setEditingCarId(carEdit);
      setIsModalOpenCar(true);
    }

    console.log(carEdit);
    console.log(id);
  };

  const bikeEdit = (id: string) => {
    const bikeEdit = bikeData.find((bike) => bike.id === id);
    if (bikeEdit) {
      setEditingBikeId(bikeEdit);
      setIsModalOpenBike(true);
    }

    console.log(bikeEdit);
    console.log(id);
  };

  const closeModal = () => {
    setIsModalOpenCar(false);
    setIsModalOpenBike(false);

    setEditingBikeId(null);
    setEditingCarId(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingCarId) {
      const carRef = doc(db, "cars", editingCarId.id);
      await updateDoc(carRef, {
        brand: editingCarId.brand,
        model: editingCarId.model,
        year: editingCarId.yearFactor,
        yearModification: editingCarId.yearModification,
        price: editingCarId.price,
        color: editingCarId.color,
        description: editingCarId.description,
        // options: editingCarId.options,
      })
        .then(() => {
          console.log("Document successfully updated!");
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    } else if (editingBikeId) {
      const bikeRef = doc(db, "bikes", editingBikeId.id);
      await updateDoc(bikeRef, {
        brand: editingBikeId.brand,
        model: editingBikeId.model,
        year: editingBikeId.year,
        price: editingBikeId.price,
        color: editingBikeId.color,
        description: editingBikeId.description,
      })
        .then(() => {
          console.log("Document successfully updated!");
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  };

  const removeCar = async (id: string) => {
    await deleteDoc(doc(db, "cars", id))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const removeBike = async (id: string) => {
    await deleteDoc(doc(db, "bikes", id))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Car[];
      setCarData(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bikes"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Bike[];
      setBikeData(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Header />
      <Layout>
        <section>
          <div className="container mx-auto px-6 p-10">
            {loading ? (
              <h1>Carregando...</h1>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-black">Carros</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {carData.map((car: Car) => (
                    <CardCar
                      key={car.id}
                      id={car.id}
                      name={car.brand}
                      price={formatPrice(car.price)}
                      color={car.color}
                      images={car.images}
                      onRemove={() => removeCar(car.id)}
                      onEdit={() => editableCar(car.id)}
                      isEditable={editingCarId?.id === car.id}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="container mx-auto px-6 p-10">
            <h1 className="text-2xl font-bold text-black">Motos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {bikeData.map((bike: Bike) => (
                <CardCar
                  key={bike.id}
                  id={bike.id}
                  name={bike.brand}
                  price={formatPrice(bike.price)}
                  color={bike.color}
                  images={bike.images}
                  onRemove={() => removeBike(bike.id)}
                  onEdit={() => bikeEdit(bike.id)}
                  isEditable={editingCarId?.id === bike.id}
                />
              ))}
            </div>
          </div>
        </section>
      </Layout>

      {editingCarId && isModalOpenCar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Carro</h2>

            <Modal
              isOpen={isModalOpenCar}
              setOpen={setIsModalOpenCar}
              cancelButtonRef={ref}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="brand">Marca</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={editingCarId.brand}
                  onChange={(e) =>
                    setEditingCarId({
                      ...editingCarId,
                      brand: e.target.value,
                    })
                  }
                />
                <label htmlFor="model">Modelo</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={editingCarId.model}
                  onChange={(e) =>
                    setEditingCarId({
                      ...editingCarId,
                      model: e.target.value,
                    })
                  }
                />
                <label htmlFor="year">Ano</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={editingCarId.yearFactor}
                  onChange={(e) =>
                    setEditingCarId({
                      ...editingCarId,
                      yearFactor: Number(e.target.value),
                    })
                  }
                />
                <label htmlFor="price">Preço</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editingCarId.price}
                  onChange={(e) =>
                    setEditingCarId({
                      ...editingCarId,
                      price: Number(e.target.value),
                    })
                  }
                />
                <label htmlFor="color">Cor</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={editingCarId.color}
                  onChange={(e) =>
                    setEditingCarId({
                      ...editingCarId,
                      color: e.target.value,
                    })
                  }
                />
                <label htmlFor="color">Localização</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editingCarId.location}
                  onChange={(e) =>
                    setEditingCarId({
                      ...editingCarId,
                      location: e.target.value,
                    })
                  }
                />
                <label htmlFor="color">Tipo</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={editingCarId.type}
                  onChange={(e) =>
                    setEditingCarId({
                      ...editingCarId,
                      type: e.target.value,
                    })
                  }
                />

                <label htmlFor="color">Portas</label>
                <input
                  type="text"
                  id="doors"
                  name="doors"
                  value={editingCarId.door}
                  onChange={(e) =>
                    setEditingCarId({
                      ...editingCarId,
                      door: e.target.value,
                    })
                  }
                />

                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={editingCarId.description}
                  onChange={(e) =>
                    setEditingCarId({
                      ...editingCarId,
                      description: e.target.value,
                    })
                  }
                />
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Salvar
                </button>
              </form>
            </Modal>
          </div>
        </div>
      )}

      {editingBikeId && isModalOpenBike && (
        <Modal
          isOpen={isModalOpenBike}
          setOpen={setIsModalOpenBike}
          cancelButtonRef={ref}
        >
          <form className="flex flex-col gap-4">
            <label htmlFor="brand">Marca</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={editingBikeId.brand}
              onChange={(e) =>
                setEditingBikeId({
                  ...editingBikeId,
                  brand: e.target.value,
                })
              }
            />
            <label htmlFor="model">Modelo</label>
            <input
              type="text"
              id="model"
              name="model"
              value={editingBikeId.model}
              onChange={(e) =>
                setEditingBikeId({
                  ...editingBikeId,
                  model: e.target.value,
                })
              }
            />
            <label htmlFor="year">Ano</label>
            <input
              type="number"
              id="year"
              name="year"
              value={editingBikeId.year}
              onChange={(e) =>
                setEditingBikeId({
                  ...editingBikeId,
                  year: Number(e.target.value),
                })
              }
            />
            <label htmlFor="price">Preço</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editingBikeId.price}
              onChange={(e) =>
                setEditingBikeId({
                  ...editingBikeId,
                  price: Number(e.target.value),
                })
              }
            />
            <label htmlFor="color">Cor</label>
            <input
              type="text"
              id="color"
              name="color"
              value={editingBikeId.color}
              onChange={(e) =>
                setEditingBikeId({
                  ...editingBikeId,
                  color: e.target.value,
                })
              }
            />
            <label htmlFor="color">Localização</label>
            <input
              type="text"
              id="location"
              name="location"
              value={editingBikeId.location}
              onChange={(e) =>
                setEditingBikeId({
                  ...editingBikeId,
                  location: e.target.value,
                })
              }
            />

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Salvar
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
