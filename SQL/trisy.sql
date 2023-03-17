-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema trisy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema trisy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trisy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `trisy` ;

-- -----------------------------------------------------
-- Table `trisy`.`member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trisy`.`member` (
  `id` INT NOT NULL,
  `email` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `birth` DATE NOT NULL,
  `createdate` DATE NOT NULL,
  `phonenumber` VARCHAR(20) NOT NULL,
  `address` VARCHAR(20) NOT NULL,
  `username` VARCHAR(20) NOT NULL,
  `user_role` VARCHAR(45) NULL,
  `provider` VARCHAR(45) NULL,
  `provider_id` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `XPKmember` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trisy`.`tour_schedules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trisy`.`tour_schedules` (
  `id` INT NOT NULL,
  `name` VARCHAR(20) NULL DEFAULT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `XPKtour_schedules` (`id` ASC) VISIBLE,
  INDEX `fk_tour_schedules_member1_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_tour_schedules_member1`
    FOREIGN KEY (`member_id`)
    REFERENCES `trisy`.`member` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trisy`.`board`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trisy`.`board` (
  `id` INT NOT NULL,
  `title` VARCHAR(20) NULL DEFAULT NULL,
  `content` VARCHAR(20) NULL DEFAULT NULL,
  `createtime` DATE NULL DEFAULT NULL,
  `updatetime` DATE NULL DEFAULT NULL,
  `member_id` INT NOT NULL,
  `tour_schedules_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `XPKboard` (`id` ASC) VISIBLE,
  INDEX `fk_board_member_idx` (`member_id` ASC) VISIBLE,
  INDEX `fk_board_tour_schedules1_idx` (`tour_schedules_id` ASC) VISIBLE,
  CONSTRAINT `fk_board_member`
    FOREIGN KEY (`member_id`)
    REFERENCES `trisy`.`member` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_board_tour_schedules1`
    FOREIGN KEY (`tour_schedules_id`)
    REFERENCES `trisy`.`tour_schedules` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trisy`.`board_image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trisy`.`board_image` (
  `id` INT NOT NULL,
  `url_path` VARCHAR(20) NULL DEFAULT NULL,
  `origin_name` VARCHAR(45) NULL,
  `saved_name` VARCHAR(45) NULL,
  `board_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `XPKboard_image` (`id` ASC) VISIBLE,
  INDEX `fk_board_image_board1_idx` (`board_id` ASC) VISIBLE,
  CONSTRAINT `fk_board_image_board1`
    FOREIGN KEY (`board_id`)
    REFERENCES `trisy`.`board` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trisy`.`region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trisy`.`region` (
  `region_id` INT NOT NULL,
  `si_code` VARCHAR(20) NULL DEFAULT NULL,
  `si_name` VARCHAR(20) NULL DEFAULT NULL,
  `gugun_name` VARCHAR(20) NULL DEFAULT NULL,
  `gugun_code` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`region_id`),
  UNIQUE INDEX `XPKregion` (`region_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trisy`.`theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trisy`.`theme` (
  `main_category_code` VARCHAR(20) NULL DEFAULT NULL,
  `main_category_name` VARCHAR(20) NULL DEFAULT NULL,
  `middle_category_code` VARCHAR(20) NULL DEFAULT NULL,
  `middle_category_name` VARCHAR(20) NULL DEFAULT NULL,
  `sub_category_code` VARCHAR(20) NOT NULL,
  `sub_category_name` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`sub_category_code`),
  UNIQUE INDEX `XPKtheme` (`sub_category_code` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trisy`.`tour_spot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trisy`.`tour_spot` (
  `id` INT NOT NULL,
  `lat` VARCHAR(20) NULL DEFAULT NULL,
  `lng` VARCHAR(20) NULL DEFAULT NULL,
  `phone_number` VARCHAR(20) NULL DEFAULT NULL,
  `image` VARCHAR(20) NULL DEFAULT NULL,
  `info` VARCHAR(20) NULL DEFAULT NULL,
  `name` VARCHAR(20) NULL DEFAULT NULL,
  `zipcode` VARCHAR(20) NULL DEFAULT NULL,
  `region_region_id` INT NOT NULL,
  `theme_sub_category_code` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `XPKtour_spot` (`id` ASC) VISIBLE,
  INDEX `fk_tour_spot_region1_idx` (`region_region_id` ASC) VISIBLE,
  INDEX `fk_tour_spot_theme1_idx` (`theme_sub_category_code` ASC) VISIBLE,
  CONSTRAINT `fk_tour_spot_region1`
    FOREIGN KEY (`region_region_id`)
    REFERENCES `trisy`.`region` (`region_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tour_spot_theme1`
    FOREIGN KEY (`theme_sub_category_code`)
    REFERENCES `trisy`.`theme` (`sub_category_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trisy`.`tour_schedule_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trisy`.`tour_schedule_details` (
  `id` INT NOT NULL,
  `tour_spot_id` INT NOT NULL,
  `tour_schedules_id` INT NOT NULL,
  `tour_schedules_member_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `XPKtour_schedule_details` (`id` ASC) VISIBLE,
  INDEX `fk_tour_schedule_details_tour_spot1_idx` (`tour_spot_id` ASC) VISIBLE,
  INDEX `fk_tour_schedule_details_tour_schedules1_idx` (`tour_schedules_id` ASC, `tour_schedules_member_id` ASC) VISIBLE,
  CONSTRAINT `fk_tour_schedule_details_tour_spot1`
    FOREIGN KEY (`tour_spot_id`)
    REFERENCES `trisy`.`tour_spot` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tour_schedule_details_tour_schedules1`
    FOREIGN KEY (`tour_schedules_id`)
    REFERENCES `trisy`.`tour_schedules` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
