package waa.labs.lab5.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import waa.labs.lab5.models.Book;

import java.util.List;

@Repository
public interface IBookRepository extends CrudRepository<Book, Integer> {

    public List<Book> findByTitleContaining(String title);

    public List<Book> findByPriceGreaterThanEqual(double price);
}
